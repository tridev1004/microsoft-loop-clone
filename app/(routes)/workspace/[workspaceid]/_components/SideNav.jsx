"use client";

import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Bell, Loader2Icon } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import uuid4 from "uuid4";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import NotificationBox from "./NotificationBox";

const SideNav = ({ params }) => {
  const MAX_FILE=5;
  const [documentList, setDocumentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    params && getDocumentList();
  }, [params]);

  const getDocumentList = () => {

    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceid))
    );
    setDocumentList([]);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setDocumentList((documentList) => [...documentList, doc.data()]);
      });
    });
  };
  //   create new document
  const createNewDocument = async () => {
    if(documentList?.length>=MAX_FILE){
      toast("Upgrade to add new file", {
        description: "You reach max file, Please upgrade for file creation",
        action: {
          label: "Upgrade",
          onClick: () => console.log("Undo"),
        },
      })
      return ;
    }
    setLoading(true);
    const docId = uuid4();

    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: Number(params?.workspaceid),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentOutput: [],
    });

    await setDoc(doc(db,'documentOutput',docId.toString()),{
      docId : docId,
      Output:[]
    })
    
    setLoading(false);
    router.replace("/workspace/" + params?.workspaceid + "/" + docId);
    console.log("Data Inserted");
  };

  return (
    <div className="fixed hidden h-screen p-5 shadow-md md:w-72 md:block bg-blue-50 ">
      <div className="flex items-center justify-between">
        <Logo />
        <NotificationBox>
        <Bell className="w-5 h-5 text-gray-500" />
        </NotificationBox>
      </div>
      <hr className="my-5 "></hr>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Workspace Name</h2>
          <Button size="sm" onClick={createNewDocument}>
            {loading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : "+"}
          </Button>
        </div>
      </div>
      <DocumentList documentList={documentList} params={params} />



      {/* Progess bar */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList?.length/MAX_FILE)*100}/>
        <h2 className="my-2 text-sm font-light"><strong>{documentList?.length}</strong> Out of <strong>{MAX_FILE}</strong> files used</h2>
        <h2 className="text-sm font-light ">Upgrade your plan for unlimited access</h2>

      </div>
    </div>
  );
};

export default SideNav;

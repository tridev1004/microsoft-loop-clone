"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import WorkspaceItemList from "./WorkspaceItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useEffect } from "react";

const WorkspaceList = () => {
  const { user } = useUser();
  const{orgId}=useAuth();
  const [workspaceList, setWorkspaceList] = useState([]);


  useEffect(()=>{

    user&& getWorkspaceList();


  },[orgId,user])
  const getWorkspaceList=async()=>{

    setWorkspaceList([]);
    const q=query(collection(db,"Workspace"),where('orgId','==',orgId?orgId:user?.primaryEmailAddress?.emailAddress))

    const quesrSnapshot=await getDocs(q);
    quesrSnapshot.forEach((doc)=>{
      console.log(doc.data());
      setWorkspaceList((prev)=>[...prev,doc.data()]);
      
    })

  }

  return (
    <div className="p-10 my-10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Hello, {user?.fullName}</h2>
        <Link href='/createworkspace'>
        <Button > +</Button>
        </Link>
   
      </div>
      <div className="flex justify-between mt-10 ">
        <div>
          <h2 className="font-medium text-primary">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {workspaceList?.length == 0 ? (
        <div className="flex flex-col items-center justify-center my-10">
          <Image
            src={"/workspace.png"}
            width={200}
            height={200}
            alt="workspace"
          />
          <h2>Create a new workspace</h2>
        <Link href='/createworkspace'>
          
          <Button  className="my-3">+ New Workspace</Button>
       </Link>
        </div>
      ) : (
        <div> 
          
          <WorkspaceItemList workspaceList={workspaceList}/>
        </div>
      )}
    </div>
  );
};

export default WorkspaceList;

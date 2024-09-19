"use client";

import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import GenerateAiTemplate from "./GenerateAiTemplate";

const RichDocumentEditor = ({ params }) => {
  const [documentOutput, setDocumentOutput] = useState([]);
  const editorRef = useRef(null);
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const [editor, setEditor] = useState(null);  
  let isFetched = false;

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      initEditor();
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  useEffect(() => {
    if (editor && params) {
      getDocumentOutput();
    }
  }, [params, editor]);

  const saveDocument = () => {
    if (!clerkUser) {
      console.error("User data is not available yet.");
      return;
    }

    editorRef.current.save().then(async (outputData) => {
      const docRef = doc(db, "documentOutput", params?.documentid);
      await updateDoc(docRef, {
        output: outputData,
        editedBy: clerkUser?.primaryEmailAddress?.emailAddress,
      });
    });
  };

  const getDocumentOutput = () => {
    const unsubscribe = onSnapshot(
      doc(db, "documentOutput", params?.documentid),
      (doc) => {
        if (!isFetched || doc.data()?.editedBy !== clerkUser?.primaryEmailAddress?.emailAddress) {
          if (editor && doc.data()?.output) {
            editor.render(doc.data()?.output);
          }
          isFetched = true;
        }
      }
    );
    return unsubscribe;
  };

  const initEditor = () => {
    if (!editorRef.current) {
      const newEditor = new EditorJS({
        onChange: () => {
          saveDocument();
        },
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: Alert,
        },
      });

      editorRef.current = newEditor;
      setEditor(newEditor);
    }
  };

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="mr-20 lg:-ml-80">
      <div id="editorjs"></div>
      <div className="fixed left-0 z-10 bottom-10 md:ml-80">
        <GenerateAiTemplate setGenerateAIOutput={(output) => editor?.render(output)} />
      </div>
    </div>
  );
};

export default RichDocumentEditor;

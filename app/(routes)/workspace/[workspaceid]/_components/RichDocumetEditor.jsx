"use client";

import React from 'react';
import EditorJS from '@editorjs/editorjs';
import { useRef, useEffect, useState } from 'react';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';

const RichDocumetEditor = ({ params }) => {
  const [documentOutput, setDocumentOutput] = useState([]);
  const ref = useRef();
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const [editor, setEditor] = useState(null);  // Use state for editor instance
 let isFetched=false;

  // Correctly access user properties
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      InitEditor();

      // Log to inspect the user object and email
      console.log("Full user object:", clerkUser);  // Log the full user object
      console.log("User full name:", clerkUser?.fullName);  // Access full name
      console.log("User email:", clerkUser?.primaryEmailAddress?.emailAddress);  // Access email
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  useEffect(() => {
    if (editor && params) {
      GetDocumentOutput();  
    }
  }, [params, editor]);  // Wait for editor initialization

  const saveDocument = () => {
    if (!clerkUser) {
      console.error("User data is not available yet.");
      return;  // Skip saving if user data is not available
    }

    ref.current.save().then(async (outputData) => {
      const docRef = doc(db, 'documentOutput', params?.documentid);
      await updateDoc(docRef, {
        output: outputData,
        editedBy: clerkUser?.primaryEmailAddress?.emailAddress ,
      });
    });
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid), (doc) => {
         if(isFetched==false || doc.data()?.editedBy!=clerkUser?.primaryEmailAddress?.emailAddress)

        if (editor && doc.data()?.output) {
        editor.render(doc.data()?.output);  // Safely render content if editor is initialized
      }
      isFetched=true;
    });
  };

  const InitEditor = () => {
    if (!ref.current) {
      const newEditor = new EditorJS({
        onChange: (ap, event) => {
          saveDocument();
        },
        holder: 'editorjs',
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: Alert,
        },
      });

      ref.current = newEditor;
      setEditor(newEditor);  // Set the editor instance in state
    }
  };

  return (
    <div className="lg:-ml-40">
      <div id="editorjs"></div>
    </div>
  );
};

export default RichDocumetEditor;

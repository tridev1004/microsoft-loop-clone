"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export function Room({ children, params }) {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth?roomId="+params?.documentid}
      resolveUsers={async ({ userIds }) => {
        console.log(userIds);
        const q=query(collection(db,"LoopUsers"),where('email','in',userIds));
        const querySnapShot = await getDocs(q);
       const userList=[];
        querySnapShot.forEach((doc) => {
            console.log( "here is user"+doc.data());
            userList.push(doc.data());
            
        });

            return userList;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        try {
          const q = query(collection(db, "LoopUsers"), where("email", "!=", null));
          const querySnapshot = await getDocs(q);

          let userList = [];

          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("Mention suggestion user:", userData);

            // Add fallback for name, id, and avatar
            userList.push({
              id: userData.email || "unknown-id",
              name: userData.name || "Anonymous",
              avatar: userData.avatar || "/default-avatar.png",
            });
          });

          // Filter users based on 'text' for mention suggestions
          if (text) {
            userList = userList.filter((user) => user.name?.includes(text));
          }

          console.log("Mention suggestions list:", userList);
          return userList.map((user) => user.id);  // Only returning IDs
        } catch (error) {
          console.error("Error resolving mention suggestions:", error);
          return [];
        }
      }}
    >
      <RoomProvider id={params?.documentid}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

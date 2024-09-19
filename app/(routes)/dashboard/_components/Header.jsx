"use client"

import Logo from "@/app/_components/Logo";
import { db } from "@/config/firebaseConfig";
import { OrganizationSwitcher, useAuth, UserButton, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";

const Header = () => {
  const { orgId } = useAuth();
  const { isLoaded, user } = useUser(); // Check if user is loaded

  useEffect(() => {
    if (isLoaded && user) {
      saveUserData();
    }
  }, [isLoaded, user]);

  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress;
    
    // Check if docId is valid before proceeding
    if (!docId) {
      console.error("User email is undefined");
      return;
    }

    await setDoc(doc(db, 'LoopUsers', docId), {
      name: user?.fullName,
      avatar: user?.imageUrl,
      email: docId
    });
  };

  return (
    <div className="flex items-center justify-between p-3 shadow-sm ">
      <Logo />
      <OrganizationSwitcher afterLeaveOrganizationUrl={"/dashboard"} afterCreateOrganizationUrl={"/dashboard"} />
      <UserButton />
    </div>
  );
};

export default Header;

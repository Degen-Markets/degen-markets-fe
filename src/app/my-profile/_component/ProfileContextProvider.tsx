"use client";
import { UserProvider } from "@/app/context/UserProfileContext";
import React, { ReactNode } from "react";
import ProfileComponent from "./ProfileComponent";

const ProfileContextProvider = () => {
  return (
    <UserProvider>
      <ProfileComponent />
    </UserProvider>
  );
};

export default ProfileContextProvider;

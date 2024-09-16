"use client";
import { UserProfileProvider } from "@/app/context/UserProfileContext";
import ProfileComponent from "./ProfileComponent";

const ProfileContextProvider = () => {
  return (
    <UserProfileProvider>
      <ProfileComponent />
    </UserProfileProvider>
  );
};

export default ProfileContextProvider;

import React from "react";
import ProfileComponent from "@/app/my-profile/_component/ProfileComponent";
import ProfileContextProvider from "./_component/ProfileContextProvider";

const MyProfile = () => {
  return (
    <>
      <ProfileContextProvider />
    </>
  );
};

export default MyProfile;

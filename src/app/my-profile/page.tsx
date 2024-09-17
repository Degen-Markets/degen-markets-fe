import React from "react";
import ProfileComponent from "@/app/my-profile/_component/ProfileComponent";
import ProfileContextProvider from "./_component/ProfileContextProvider";
import Wrapper from "../components/Wrapper";

const MyProfile = () => {
  return (
    <Wrapper>
      <ProfileContextProvider />
    </Wrapper>
  );
};

export default MyProfile;

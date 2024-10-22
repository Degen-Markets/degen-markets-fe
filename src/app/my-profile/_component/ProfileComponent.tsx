"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect } from "react";
import Hero from "./Hero";
import UserProfileInfo from "./UserProfileInfo";
import ActivityTable from "./ActivityTable";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { useUserProfileContext } from "@/app/context/UserProfileContext";

const ProfileComponent: FC = () => {
  useProfileNotFoundHandler();

  const { connected } = useWallet();

  if (!connected) {
    return null;
  }

  return (
    <div className="pt-8 lg:pt-14">
      <Hero />
      <UserProfileInfo />
      <ActivityTable />
    </div>
  );
};

const useProfileNotFoundHandler = () => {
  const { showToast } = useToast();
  const { userProfile, isProfileLoading, isProfileFetchInititated } =
    useUserProfileContext();

  useEffect(() => {
    // if profile was not available on backend
    if (isProfileFetchInititated && !isProfileLoading && !userProfile) {
      showToast("Profile not found! Please connect to X", "error");
    }
  }, [isProfileFetchInititated, isProfileLoading, userProfile, showToast]);
};

export default ProfileComponent;

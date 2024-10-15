"use client";
import { FC, useEffect } from "react";
import UserProfileInfo from "./UserProfileInfo";
import ActivityTable from "./ActivityTable";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { useToast } from "@/app/components/Toast/ToastProvider";
import Hero from "@/app/my-profile/_component/Hero";
import { useWallet } from "@solana/wallet-adapter-react";

const ProfileComponent: FC = () => {
  useProfileNotFoundHandler();

  const { connected } = useWallet();

  if (!connected) {
    return null;
  }

  return (
    <div className="pt-14">
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

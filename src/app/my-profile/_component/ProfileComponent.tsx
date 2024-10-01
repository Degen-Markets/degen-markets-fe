"use client";
import React, { useEffect } from "react";
import UserProfileInfo from "./UserProfileInfo";
import ProfileStatsGrid from "./ProfileStatsGrid";
import ActivityTable from "./ActivityTable";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { useToast } from "@/app/components/Toast/ToastProvider";

const ProfileComponent: React.FC = () => {
  useProfileNotFoundHandler();

  return (
    <div className="pt-14">
      <UserProfileInfo />
      <ProfileStatsGrid />
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

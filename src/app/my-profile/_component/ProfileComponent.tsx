"use client";
import React from "react";
import UserProfileInfo from "./UserProfileInfo";
import ProfileStatsGrid from "./ProfileStatsGrid";
import ActivityTable from "./ActivityTable";

const ProfileComponent: React.FC = () => {
  return (
    <div className="border-t pt-14">
      <UserProfileInfo />
      <ProfileStatsGrid />
      <ActivityTable />
    </div>
  );
};

export default ProfileComponent;

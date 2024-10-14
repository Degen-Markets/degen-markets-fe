import React from "react";

interface ProfileStatsProps {
  title: string;
  value: string | number;
}

const ProfileStat: React.FC<ProfileStatsProps> = ({ title, value }) => (
  <div className="flex flex-col gap-2 items-center text-sm">
    <div>{title}</div>
    <div>{value}</div>
  </div>
);

export default ProfileStat;

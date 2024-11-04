import React, { ReactElement } from "react";

interface ProfileStatsProps {
  title: string | ReactElement;
  value: string | number;
}

const ProfileStat: React.FC<ProfileStatsProps> = ({ title, value }) => (
  <div className="flex flex-col gap-2 items-center text-sm text-center">
    <div>{title}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default ProfileStat;

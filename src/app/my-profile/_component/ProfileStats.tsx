import React from "react";
import { Card } from "@/app/components/Card";
import EarnPoints from "@/app/components/Icons/EarnPointsIcon";
import IconProps from "@/app/types/Icon";

interface ProfileStatsProps {
  title: string;
  value: string | number;
  Icon: React.FC<IconProps>;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ title, value, Icon }) => (
  <Card className="border rounded-xl bg-black-medium bg-opacity-80 !py-8">
    <div className="flex items-start md:space-x-2 ">
      <Icon className="relative -top-4" />

      <div className="space-y-6">
        <h3 className="text-gray-300 mb-2 text-3xl font-bold">{title}</h3>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    </div>
  </Card>
);

export default ProfileStats;

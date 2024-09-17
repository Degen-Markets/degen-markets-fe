import React from "react";
import DesktopViewTable from "./DesktopViewTable";
import MobileViewCard from "./MobileViewCard";

const ActivityTable: React.FC = () => {
  const activities = [
    {
      marketName:
        "Who will be the first to mention crypto on tonight's interview?",
      value: "$210.27",
      payout: "$510.27",
      imageUrl: "/user-avatars/default.jpg",
    },
    {
      marketName:
        "Who will be the first to mention crypto on tonight's interview?",
      value: "$210.27",
      payout: "$510.27",
      imageUrl: "/user-avatars/default.jpg",
    },
    {
      marketName:
        "Who will be the first to mention crypto on tonight's interview?",
      value: "$210.27",
      payout: "$510.27",
      imageUrl: "/user-avatars/default.jpg",
    },
  ];

  return (
    <main>
      <h3 className="font-bold mb-4 text-3xl border-b pb-5">Activity</h3>
      <DesktopViewTable activities={activities} />
      <MobileViewCard activities={activities} />
    </main>
  );
};

export default ActivityTable;

import React from "react";
import DesktopViewTable from "./DesktopViewTable";
import MobileViewCard from "./MobileViewCard";
import LeaderboardIcon from "@/app/components/Icons/LeaderboardIcon";
import { Activity } from "./type";

const ActivityTable: React.FC = () => {
  const activities: Activity[] = [];
  return (
    <main>
      <h3 className="font-bold mb-4 text-3xl border-b pb-5">Activity</h3>

      {activities.length > 0 ? (
        <>
          <DesktopViewTable activities={activities} />
          <MobileViewCard activities={activities} />
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-96">
          <LeaderboardIcon />
          <h3 className="text-center font-bold text-2xl text-gray-400">
            No recent activities.
          </h3>
          <p className="text-center text-base">
            Participate in markets to see your activity here!
          </p>
        </div>
      )}
    </main>
  );
};

export default ActivityTable;

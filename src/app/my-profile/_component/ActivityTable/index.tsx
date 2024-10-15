import React from "react";
import DesktopViewTable from "./DesktopViewTable";
import MobileViewCard from "./MobileViewCard";
import LeaderboardIcon from "@/app/components/Icons/LeaderboardIcon";
import { Activity } from "./type";
import { SectionHeadline } from "@/app/components/Section";

const ActivityTable: React.FC = () => {
  const activities: Activity[] = [];
  return (
    <section>
      <SectionHeadline>Activity</SectionHeadline>

      {activities.length > 0 ? (
        <>
          <DesktopViewTable activities={activities} />
          <MobileViewCard activities={activities} />
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-56">
          <LeaderboardIcon />
          <h3 className="text-center text-xl text-secondary">
            No recent activities.
          </h3>
          <p className="text-sm text-center">
            Participate in markets to see your activity here!
          </p>
        </div>
      )}
    </section>
  );
};

export default ActivityTable;

import React from "react";
import ActivityRow from "../ActivityRow";
import { ActivitiesProps } from "./type";

const DesktopViewTable: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full max-w-screen-2xl min-w-[900px]">
        <thead className="text-xs text-lavender-blue">
          <tr>
            <th className="px-6 py-3 text-left">Market</th>
            <th className="px-6 py-3 text-center">Value</th>
            <th className="px-6 py-3 text-center whitespace-nowrap">
              Est. Payout
            </th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <ActivityRow
              key={index}
              marketName={activity.marketName}
              value={activity.value}
              payout={activity.payout}
              imageUrl={activity.imageUrl}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopViewTable;

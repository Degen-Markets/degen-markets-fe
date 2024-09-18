import React from "react";
import ActivityRow from "../ActivityRow";
import { ActivitiesProps } from "./type";

const DesktopViewTable: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full max-w-screen-2xl min-w-[900px]">
        <thead>
          <tr className="text-left text-gray-300">
            <th className="pb-2 text-lg md:text-2xl text-left">Market</th>
            <th className="pb-2 text-lg md:text-2xl text-center">Value</th>
            <th className="pb-2 text-lg md:text-2xl text-center whitespace-nowrap">
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

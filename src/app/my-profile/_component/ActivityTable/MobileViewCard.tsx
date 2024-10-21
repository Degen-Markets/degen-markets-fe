import React from "react";
import Image from "next/image";
import { ActivitiesProps } from "./type";

const MobileViewCard: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <div className="block md:hidden">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-black-light rounded-lg border border-gray-700 shadow-md font-bold"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={activity.imageUrl}
              alt="Market"
              width={60}
              height={60}
              className="rounded"
            />
            <div className="text-left">
              <p className="text-lg font-semibold mb-1 text-white">
                {activity.marketName}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="bg-black-dark rounded-lg border font-bold px-2 py-0.5">
                  Based Trump
                </span>
                <div className="flex items-center space-x-1">
                  <span>1.6 SOL</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-lg">
            <div className="text-white">Value: {activity.value}</div>
            <div className="text-success">Payout: {activity.payout}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileViewCard;

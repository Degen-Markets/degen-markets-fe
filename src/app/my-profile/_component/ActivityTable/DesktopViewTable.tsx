import React from "react";
import ActivityRow from "../ActivityRow";
import { PoolEntry } from "@/app/types/player";
import { table } from "console";

interface DesktopViewTableProps {
  poolEntries: PoolEntry[];
}

const DesktopViewTable: React.FC<DesktopViewTableProps> = ({ poolEntries }) => {
  return (
    <div className="block w-full max-w-screen-2xl overflow-x-auto">
      <div className="grid grid-cols-6 md:grid-cols-7  text-xs text-lavender-blue px-2 md:pl-4 font-bold border-b border-main divide-x-2 h-16 divide-main">
        <div className="col-span-4 text-left flex items-center">Market</div>
        <div className="hidden md:flex col-span-1 text-center  items-center justify-center">
          Option TVL (SOL)
        </div>
        <div className="hidden md:flex col-span-1 text-center items-center justify-center whitespace-nowrap">
          Pool TVL (SOL)
        </div>
        <div className="col-span-2 md:col-span-1 text-center flex items-center justify-center whitespace-nowrap">
          Pool
        </div>
      </div>

      <div className="divide-main">
        {poolEntries.map((entry) => (
          <ActivityRow key={entry.address} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default DesktopViewTable;

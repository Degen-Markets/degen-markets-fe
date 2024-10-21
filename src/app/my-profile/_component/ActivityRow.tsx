import React, { useState } from "react";
import Image from "next/image";
import { SiSolana } from "react-icons/si";
import { solBalance } from "@/app/lib/utils/helpers";
import { PoolEntry } from "@/app/types/player";
import { UserPoolActivityDrawer } from "@/app/components/Drawer/UserPoolActivityDrawer";

interface ActivityRowProps {
  entry: PoolEntry;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ entry }) => {
  const { option, pool, value } = entry;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-6 md:grid-cols-7 gap-4 items-center px-2 md:pl-4  bg-steel-gray h-20 border-b-4 border-b-main">
      <div className="col-span-4 flex items-center space-x-2">
        <Image
          src={pool.image}
          alt="Market"
          width={50}
          height={50}
          className="rounded"
        />
        <div>
          <p className="mb-1 w-full line-clamp-1">{pool.title}</p>
          <div className="flex items-center md:space-x-2 text-sm text-gray-400">
            <span className="bg-black-light rounded-lg border font-bold px-2 hidden md:block">
              {option.title}
            </span>
            <div className="flex items-center space-x-1">
              <span>{solBalance(option.totalValue)}</span>
              <SiSolana
                size={12}
                className="rounded-full bg-white p-0.5 text-black-dark"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex text-center h-full items-center justify-center col-span-1">
        {solBalance(value)}
      </div>

      <div className="hidden md:flex text-center text-green-main h-full items-center justify-center col-span-1">
        {solBalance(pool.totalValue)}
      </div>

      <div className="col-span-2 md:col-span-1 text-center text-green-main h-full flex items-center justify-center">
        <span
          className="block  underline hover:text-primary underline-offset-1 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          View
        </span>
      </div>

      <UserPoolActivityDrawer entry={entry} open={open} setOpen={setOpen} />
    </div>
  );
};

export default ActivityRow;

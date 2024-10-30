import React, { useState } from "react";
import Image from "next/image";
import { solBalance } from "@/app/lib/utils/helpers";
import { PoolEntry } from "@/app/types/player";
import { UserPoolActivityDrawer } from "@/app/components/Drawer/UserPoolActivityDrawer";
import { Button } from "@/app/components/Button/Button";
import { usePlayerBetLabel } from "@/app/hooks/usePlayerBetLabel";

interface ActivityRowProps {
  entry: PoolEntry;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ entry }) => {
  const { option, pool, value } = entry;
  const [open, setOpen] = useState<boolean>(false);
  const betLabel = usePlayerBetLabel();
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
          <div className="flex items-center text-sm text-gray-400">
            <p className="bg-black-light font-bold hidden md:block">
              {betLabel}:
              <span className="text-primary-light px-1 py-0.5 ">
                {option.title}
              </span>
              |
            </p>

            <div className="flex items-center space-x-1 px-1">
              <span>{solBalance(value)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex text-center h-full items-center justify-center col-span-1">
        {solBalance(option.totalValue, false)}
      </div>

      <div className="hidden md:flex text-center text-green-main h-full items-center justify-center col-span-1">
        {solBalance(pool.totalValue, false)}
      </div>

      <div className="col-span-2 md:col-span-1 text-center text-green-main h-full flex items-center justify-center">
        <Button
          size="extraSmall"
          intent="outlineWhite"
          onClick={() => setOpen(true)}
        >
          View
        </Button>
      </div>

      <UserPoolActivityDrawer entry={entry} open={open} setOpen={setOpen} />
    </div>
  );
};

export default ActivityRow;

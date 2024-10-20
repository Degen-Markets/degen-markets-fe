import { PoolEntry } from "@/app/types/player";
import { Drawer, DrawerContent } from "./drawer";
import { solBalance } from "@/app/lib/utils/helpers";
import Link from "next/link";
import { Button } from "../Button/Button";
import Image from "next/image";

interface UserActivityDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  entry: PoolEntry;
}

export const UserPoolDrawer = ({
  entry,
  open,
  setOpen,
}: UserActivityDrawerProps) => {
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <ActivityCard entry={entry} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface ActivityCardProps {
  entry: PoolEntry;
}
const ActivityCard: React.FC<ActivityCardProps> = ({ entry }) => {
  const { pool, option, value } = entry;

  return (
    <div className="w-full text-white max-w-md mx-auto ">
      <div className="space-y-3 mb-5">
        <Image
          src={pool.image}
          width={300}
          height={400}
          alt="Pool Image"
          className="w-full h-auto object-cover rounded-md"
        />
        <h2 className="text-lg font-bold">{pool.title}</h2>

        <div className="flex justify-between">
          <p className="text-sm text-gray-400 font-bold">Selected Option</p>
          <p className="text-sm text-gray-400 font-bold">{option.title}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-gray-400 font-bold">Option Total Value</p>
          <p className="text-sm text-gray-400">
            {solBalance(option.totalValue)}
          </p>
        </div>

        <div className="flex justify-between ">
          <p className="text-sm text-gray-400 font-bold">My Bet</p>
          <p className="text-sm text-gray-400">{solBalance(value)}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Pool TVL</span>
          <span className="text-sm font-bold">
            {solBalance(pool.totalValue)}
          </span>
        </div>
      </div>
      <Link href={`/pools/${pool.address}`}>
        <Button intent="primary" className="w-full">
          View Pool
        </Button>
      </Link>
    </div>
  );
};

import { PoolEntry } from "@/app/types/player";
import { Drawer, DrawerClose, DrawerContent } from "./drawer";
import { solBalance } from "@/app/lib/utils/helpers";
import Link from "next/link";
import { Button } from "../Button/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface UserPoolActivityDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  entry: PoolEntry;
}

export const UserPoolActivityDrawer = ({
  entry,
  open,
  setOpen,
}: UserPoolActivityDrawerProps) => {
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
  const pathname = usePathname();
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toBase58();

  const playerId = useMemo(() => {
    const match = pathname.match(/^\/players\/([^/]+)$/);
    return match ? match[1] : null;
  }, [pathname]);

  const isPlayerRoute = !!playerId;

  const betLabel = useMemo(() => {
    if (!isPlayerRoute) {
      return "My Bet";
    }
    return publicKey === playerId ? "My Bet" : "Player Bet";
  }, [isPlayerRoute, publicKey, playerId]);

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
          <p className="text-sm text-lavender-blue font-bold">
            Selected Option
          </p>
          <p className="text-sm text-lavender-blue font-bold">{option.title}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-lavender-blue font-bold">
            Option Total Value
          </p>
          <p className="text-sm text-lavender-blue">
            {solBalance(option.totalValue)}
          </p>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-lavender-blue font-semibold">
            Pool TVL
          </span>
          <span className="text-sm text-lavender-blue font-bold">
            {solBalance(pool.totalValue)}
          </span>
        </div>
        <div className="flex justify-between ">
          <p className="text-sm  font-bold">{betLabel}</p>
          <p className="text-sm ">{solBalance(value)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2  mb-2">
        <DrawerClose className="w-full">
          <Button intent="outlineWhite" className="w-full" size="small">
            Close
          </Button>
        </DrawerClose>
        <Link href={`/pools/${pool.address}`} className="w-full">
          <Button intent="primary" className="w-full" size="small">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

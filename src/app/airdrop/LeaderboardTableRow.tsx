"use client";

import { TrophyIcon } from "@heroicons/react/24/solid";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import { useRouter } from "next/navigation";
import { Player } from "../types/player";
import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { twMerge } from "tailwind-merge";

const LeaderboardTableRow = ({
  player,
  index,
}: {
  player: Player;
  index: number;
}) => {
  const router = useRouter();
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toBase58();
  const isCurrentUser = publicKey === player.address;

  const handleClick = useCallback(() => {
    router.push(`/players/${player.address}`);
  }, [player.address, router]);

  const playerTag = player.twitterUsername
    ? `@${player.twitterUsername}`
    : getDisplayNameForAddress(player.address);
  const displayName = isCurrentUser ? "YOU" : playerTag;

  const getClassNames = (baseClass: string, isCurrent: boolean) =>
    twMerge(baseClass, isCurrent ? "text-primary" : "");

  return (
    <div
      className="grid grid-cols-5 lg:text-base border-b-4 border-b-main bg-steel-gray hover:bg-slate-700 cursor-pointer hover:scale-[1.01] transition-all duration-200 items-center"
      onClick={handleClick}
      role="link"
      aria-label={`View player ${player.address}`}
    >
      <div className="px-2 lg:px-6 py-2 font-medium col-span-1 flex items-center gap-2">
        <TrophyIcon
          width={24}
          className={getClassNames("text-lavender-blue", isCurrentUser)}
        />
        <span className={getClassNames("", isCurrentUser)}>{index + 1}</span>
      </div>
      <div className="px-2 lg:px-6 py-2 col-span-3 flex items-center gap-3">
        <UserAvatar
          src={player.twitterPfpUrl}
          className="h-8 w-8 lg:w-12 lg:h-12"
          width={32}
          height={32}
        />
        <div className="text-sm lg:text-lg font-semibold">
          <span className={isCurrentUser ? "text-primary font-extrabold" : ""}>
            {displayName}
          </span>
        </div>
      </div>
      <div
        className={getClassNames("px-2 lg:px-6 py-2 col-span-1", isCurrentUser)}
      >
        {player.points}
      </div>
    </div>
  );
};

export default LeaderboardTableRow;

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

  const displayName =
    player.twitterUsername && !isCurrentUser
      ? `@${player.twitterUsername}`
      : isCurrentUser
        ? "@YOU"
        : getDisplayNameForAddress(player.address);

  const getClassNames = (baseClass: string, isCurrent: boolean) =>
    twMerge(baseClass, isCurrent ? "text-primary" : "");

  return (
    <tr
      className="text-sm lg:text-base border-b-4 border-b-main bg-steel-gray hover:bg-slate-700 rounded-lg cursor-pointer hover:scale-[1.01] transition-all duration-200"
      key={player.address}
      onClick={handleClick}
      role="link"
      aria-label={`View player ${player.address}`}
    >
      <th className="px-2 lg:px-6 py-2 font-medium whitespace-nowrap">
        <div
          className={getClassNames("flex items-center gap-1", isCurrentUser)}
        >
          <TrophyIcon
            width={24}
            className={getClassNames("text-lavender-blue", isCurrentUser)}
          />{" "}
          {index + 4}
        </div>
      </th>
      <td className="px-2 lg:px-6 py-2">
        <div className="flex gap-3 items-center">
          <UserAvatar
            src={player.twitterPfpUrl}
            className="h-8 w-8 lg:w-12 lg:h-12"
            width={32}
            height={32}
          />
          <div className="text-sm lg:text-lg font-semibold">
            <span
              className={isCurrentUser ? "text-primary font-extrabold" : ""}
            >
              {displayName}
            </span>
          </div>
        </div>
      </td>
      <td className={getClassNames("px-2 lg:px-6 py-2", isCurrentUser)}>
        {player.points}
      </td>
    </tr>
  );
};

export default LeaderboardTableRow;

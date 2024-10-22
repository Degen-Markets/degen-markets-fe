"use client";
import { TrophyIcon } from "@heroicons/react/24/solid";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import { useRouter } from "next/navigation";
import { Player } from "../types/player";
import { useCallback } from "react";

const LeaderboardTableRow = ({
  player,
  index,
}: {
  player: Player;
  index: number;
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/players/${player.address}`);
  }, [player.address, router]);
  return (
    <tr
      className="text-sm lg:text-base border-b-4 border-b-main bg-steel-gray hover:bg-slate-700 rounded-lg cursor-pointer hover:scale-[1.01] transition-all duration-200"
      key={player.address}
      onClick={handleClick}
      role="link"
      aria-label={`View player ${player.address}`}
    >
      <th className="px-2 lg:px-6 py-2 font-medium  whitespace-nowrap">
        <div className="flex items-center gap-1">
          <TrophyIcon width={24} className="text-lavender-blue" /> {index + 4}
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
            {player.twitterUsername
              ? `@${player.twitterUsername}`
              : getDisplayNameForAddress(player.address)}
          </div>
        </div>
      </td>
      <td className="px-2 lg:px-6 py-2">{player.points}</td>
    </tr>
  );
};

export default LeaderboardTableRow;

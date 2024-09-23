import { FC } from "react";
import { Player } from "@/app/types/player";
import UserAvatar from "@/app/components/UserAvatar";
import { twMerge } from "tailwind-merge";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import PositionIcon from "@/app/components/Icons/PositionIcon";
import Link from "next/link";

interface PlayerRowProps {
  player: Player;
  order: number;
}

const PlayerRow: FC<PlayerRowProps> = ({ player, order }) => (
  <div className="flex gap-4 items-center">
    <div className="relative">
      <UserAvatar
        src={player.twitterPfpUrl}
        className="rounded-md h-16 w-16 lg:w-20 lg:h-20"
        width={90}
        height={90}
      />
      <div
        className={twMerge(
          "absolute",
          order <= 3 ? "-top-10 -right-10" : "-top-5 -right-5",
        )}
      >
        <PositionIcon width={80} height={80} order={order} />
      </div>
    </div>
    <div className="flex flex-col gap-1 justify-center font-bold">
      <div className="text-base">
        {player.twitterUsername && (
          <Link
            href={`https://x.com/${player.twitterUsername}`}
            target="_blank"
          >
            @{player.twitterUsername}
          </Link>
        )}
        {!player.twitterUsername && getDisplayNameForAddress(player.address)}
      </div>
      <span className="text-gray-400 text-sm">{player.points} Points</span>
    </div>
  </div>
);

interface LeaderboardProps {
  players: Player[];
}

const LeaderboardTable: FC<LeaderboardProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  const rowsPerColumn = Math.ceil(sortedPlayers.length / 3);

  const columns: Player[][] = [[], [], []];

  sortedPlayers.forEach((player, index) => {
    columns[Math.floor(index / rowsPerColumn)].push(player);
  });

  const renderPlayerRows = (players: Player[], offset = 0) =>
    players.map((player, index) => (
      <PlayerRow
        key={player.address}
        player={player}
        order={index + 1 + offset}
      />
    ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-y-8 gap-x-16">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6">
          {renderPlayerRows(column, colIndex * rowsPerColumn)}
        </div>
      ))}
    </div>
  );
};

export default LeaderboardTable;

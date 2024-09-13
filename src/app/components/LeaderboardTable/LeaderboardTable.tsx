import { FC } from "react";
import { Player } from "@/app/types/player";
import UserAvatar from "@/app/components/UserAvatar";
import RankIcon from "@/app/components/Icons/RankIcon";
import { twMerge } from "tailwind-merge";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";

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
        <RankIcon width={80} height={80} order={order} />
      </div>
    </div>
    <div className="flex flex-col gap-1 justify-center font-bold">
      <div className="text-base">
        {player.twitterUsername || getDisplayNameForAddress(player.address)}
      </div>
      <span className="text-gray-400 text-sm">{player.points} Points</span>
    </div>
  </div>
);

interface LeaderboardProps {
  players: Player[];
}

const LeaderboardTable: FC<LeaderboardProps> = ({ players }) => {
  const renderPlayerRows = (players: Player[], offset = 0) =>
    players.map((player, index) => (
      <PlayerRow
        key={player.address}
        player={player}
        order={index + 1 + offset}
      />
    ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-8 gap-x-16">
      <div className="flex flex-col gap-6">
        {renderPlayerRows(players.slice(0, 5))}
      </div>
      <div className="flex flex-col gap-6">
        {renderPlayerRows(players.slice(5), 5)}
      </div>
    </div>
  );
};

export default LeaderboardTable;

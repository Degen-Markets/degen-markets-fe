import { Player } from "@/app/types/player";
import { FC } from "react";
import UserAvatar from "@/app/components/UserAvatar";
import RankIcon from "@/app/components/Icons/RankIcon";
import { twMerge } from "tailwind-merge";

interface LeaderboardProps {
  players: Array<Player>;
}

interface PlayerRowProps extends Player {
  player: Player;
  order: number;
}

const PlayerRow: FC<PlayerRowProps> = ({
  twitterUsername,
  twitterPfpUrl,
  points,
  order,
}) => (
  <div className="flex gap-4">
    <div className="relative">
      <UserAvatar
        src={twitterPfpUrl || "/user-avatars/default.jpg"}
        className="rounded-md h-16 w-16 lg:w-20 lg:h-20"
        width={90}
        height={90}
      />
      <div
        className={twMerge(
          "absolute",
          order > 3 ? "-top-5 -right-5" : "-top-10 -right-10",
        )}
      >
        <RankIcon width={80} height={80} order={order} />
      </div>
    </div>
    <div className="flex flex-col gap-1 justify-center font-bold">
      <div className="text-base">{twitterUsername}</div>
      <span className="text-gray-400 text-sm">{points} Points</span>
    </div>
  </div>
);

const LeaderboardTable: FC<LeaderboardProps> = ({ players }) => {
  const leftColumnPlayers = players.filter((_, index) => index % 2 === 0);
  const rightColumnPlayers = players.filter((_, index) => index % 2 !== 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-8 gap-x-16">
      <div className="flex flex-col gap-6">
        {leftColumnPlayers.map((player, index) => (
          <PlayerRow
            player={player}
            {...player}
            order={index + 1}
            key={index}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {rightColumnPlayers.map((player, index) => (
          <PlayerRow
            player={player}
            {...player}
            order={index + 1 + leftColumnPlayers.length}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default LeaderboardTable;

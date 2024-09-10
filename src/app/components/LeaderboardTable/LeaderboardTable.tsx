import { Player } from "@/app/types/player";
import { FC } from "react";
import UserAvatar from "@/app/components/UserAvatar";

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
        className="rounded-lg h-12 w-12 lg:w-20 lg:h-20"
        width={90}
        height={90}
      />
      <span className="flex absolute -top-2 -right-2 bg-black-medium rounded-full w-8 h-8 text-center text-lg items-center justify-center">
        {order}
      </span>
    </div>
    <div className="flex flex-col gap-1 justify-center">
      <div className="text-lg font-bold">{twitterUsername}</div>
      <span className="text-gray-400 text-lg">{points} Points</span>
    </div>
  </div>
);

const LeaderboardTable: FC<LeaderboardProps> = ({ players }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-y-8 gap-x-16">
      {players?.map((player, index) => (
        <PlayerRow player={player} {...player} order={index + 1} key={index} />
      ))}
    </div>
  );
};
export default LeaderboardTable;

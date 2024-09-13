import { Player } from "@/app/types/player";
import { FC } from "react";
import UserAvatar from "@/app/components/UserAvatar";
import RankIcon from "@/app/components/Icons/RankIcon";
import { twMerge } from "tailwind-merge";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";

interface PlayerRowProps {
  player: Player;
  order: number;
}

const PlayerRow: FC<PlayerRowProps> = ({
  player: { twitterUsername, twitterPfpUrl, points, address },
  order,
}) => {
  const isHighRank = order <= 3;
  return (
    <div className="flex gap-4">
      <div className="relative">
        <UserAvatar
          src={twitterPfpUrl}
          className="rounded-md h-16 w-16 lg:w-20 lg:h-20"
          width={90}
          height={90}
        />
        <div
          className={twMerge(
            "absolute",
            isHighRank ? "-top-10 -right-10" : "-top-5 -right-5",
          )}
        >
          <RankIcon width={80} height={80} order={order} />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-center font-bold">
        <div className="text-base">
          {twitterUsername
            ? twitterUsername
            : getDisplayNameForAddress(address)}
        </div>
        <span className="text-gray-400 text-sm">{points} Points</span>
      </div>
    </div>
  );
};

interface LeaderboardProps {
  players: Array<Player>;
}

const splitPlayersIntoColumns = (players: Array<Player>) => {
  const leftColumnPlayers = players.filter((_, index) => index % 2 === 0);
  const rightColumnPlayers = players.filter((_, index) => index % 2 !== 0);
  return { leftColumnPlayers, rightColumnPlayers };
};

const LeaderboardTable: FC<LeaderboardProps> = ({ players }) => {
  const { leftColumnPlayers, rightColumnPlayers } =
    splitPlayersIntoColumns(players);

  const renderPlayerRows = (players: Array<Player>, offset: number) =>
    players.map((player, index) => (
      <PlayerRow
        player={player}
        order={index + 1 + offset}
        key={player.twitterUsername}
      />
    ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-8 gap-x-16">
      <div className="flex flex-col gap-6">
        {renderPlayerRows(leftColumnPlayers, 0)}
      </div>
      <div className="flex flex-col gap-6">
        {renderPlayerRows(rightColumnPlayers, leftColumnPlayers.length)}
      </div>
    </div>
  );
};

export default LeaderboardTable;

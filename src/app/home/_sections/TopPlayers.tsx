import { FC } from "react";
import { Card, CardHeading } from "@/app/components/Card";
import UserAvatar from "@/app/components/UserAvatar";
import { LiaCertificateSolid } from "react-icons/lia";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { Player } from "@/app/types/player";
import { getTopPlayers } from "@/app/lib/utils/api/getTopPlayers";

interface PlayerRowProps extends Player {
  index: number;
}

const PlayerRow: FC<PlayerRowProps> = ({ id, betCount, index }) => (
  <div className="flex gap-4">
    <div className="relative">
      <UserAvatar
        address={id}
        className="rounded-lg h-12 w-12 lg:w-20 lg:h-20"
        width={90}
        height={90}
      />
      <span className="flex absolute -top-2 -right-2 bg-black-medium rounded-full w-8 h-8 text-center text-lg items-center justify-center">
        {index + 1}
      </span>
    </div>
    <div className="flex flex-col gap-1 justify-center">
      <div className="text-lg font-bold">{getDisplayNameForAddress(id)}</div>
      <span className="text-gray-400 text-lg">{betCount} Bets</span>
    </div>
  </div>
);

const TopPlayers: FC = async () => {
  const { data: topPlayers } = await getTopPlayers(10);
  return (
    <Card>
      <CardHeading icon={<LiaCertificateSolid />}>Top Players</CardHeading>
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-y-8 gap-x-16">
        {topPlayers?.map((player, index) => (
          <PlayerRow key={player.id} {...player} index={index} />
        ))}
      </div>
    </Card>
  );
};

export default TopPlayers;

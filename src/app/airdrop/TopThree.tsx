import { Section } from "@/app/components/Section";
import { FC } from "react";
import { Player } from "@/app/types/player";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import Link from "next/link";

interface Props {
  players: Player[];
}

const TopThree: FC<Props> = ({ players }) => {
  const topThreePlayers = players.slice(0, 3);

  return (
    <Section className="grid grid-cols-3 gap-4">
      {topThreePlayers.map((player, index) => (
        <div className="flex flex-col items-center" key={index}>
          <div className="flex flex-col items-center gap-3">
            <UserAvatar
              src={player.twitterPfpUrl}
              className="rounded-lg h-16 w-16 lg:w-20 lg:h-20"
              width={90}
              height={90}
            />
            <div className="text-base">
              {player.twitterUsername && (
                <Link
                  href={`https://x.com/${player.twitterUsername}`}
                  target="_blank"
                >
                  @{player.twitterUsername}
                </Link>
              )}
              {!player.twitterUsername &&
                getDisplayNameForAddress(player.address)}
            </div>
          </div>
          <div>Earn {player.points} points</div>
        </div>
      ))}
    </Section>
  );
};

export default TopThree;

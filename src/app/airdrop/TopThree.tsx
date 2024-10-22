import { FC } from "react";
import { Player } from "@/app/types/player";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { TrophyIcon } from "@heroicons/react/24/solid";

interface Props {
  players: Player[];
}

const RankColors = ["shadow-bronze", "shadow-gold", "shadow-silver"];
const BackgroundColors = ["bg-bronze", "bg-gold", "bg-silver"];

const GradientSVG = () => (
  <svg
    className="w-full h-auto"
    viewBox="0 0 468 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M398 0H71.5L0 33.5H467.5L398 0Z"
      fill="url(#paint0_linear_285_134)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_285_134"
        x1="233.75"
        y1="0"
        x2="233.75"
        y2="33.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#38384C" stopOpacity="0.9" />
        <stop offset="0.805" stopColor="#212131" />
        <stop offset="0.965" stopColor="#1A1A26" />
      </linearGradient>
    </defs>
  </svg>
);

const PlayerCard: FC<{ player: Player; index: number }> = ({
  player,
  index,
}) => {
  const isMiddlePlayer = index === 1;
  const rankClass = RankColors[index];
  const backgroundColorClass = BackgroundColors[index];

  return (
    <div
      key={player.address}
      className={twMerge(
        "flex flex-col items-center",
        isMiddlePlayer && "-mt-10",
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <UserAvatar
          src={player.twitterPfpUrl}
          className={twMerge(
            "rounded-lg lg:rounded-2xl h-10 w-10 lg:w-20 lg:h-20 shadow-2xl block",
            rankClass,
          )}
          width={90}
          height={90}
        />
        <Link
          href={`/players/${player.address}`}
          className="text-xs lg:text-lg font-semibold mb-4 lg:mb-3"
        >
          {player.twitterUsername
            ? `@${player.twitterUsername}`
            : getDisplayNameForAddress(player.address)}
        </Link>
      </div>
      <GradientSVG />
      <div className="flex flex-col gap-5 items-center bg-gradient-to-b from-steel-gray w-full h-12 lg:h-24">
        <div
          className={twMerge(
            "flex items-center justify-center w-6 h-6 lg:w-9 lg:h-9 rounded-md lg:rounded-lg p-1 lg:p-2 -mt-5",
            backgroundColorClass,
          )}
        >
          <TrophyIcon width={32} className="text-steel-gray" />
        </div>
        <div className="text-xs lg:text-lg">
          Earn <b>{player.points}</b> points
        </div>
      </div>
    </div>
  );
};

const TopThree: FC<Props> = ({ players }) => {
  const topThreePlayers = players.slice(0, 3);
  const reorderedPlayers = [
    topThreePlayers[2],
    topThreePlayers[0],
    topThreePlayers[1],
  ];

  return (
    <section className="grid grid-cols-3 gap-2 lg:gap-8">
      {reorderedPlayers.map((player, index) => (
        <PlayerCard key={player.address} player={player} index={index} />
      ))}
    </section>
  );
};

export default TopThree;

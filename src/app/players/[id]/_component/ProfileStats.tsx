"use client";
import XIcon from "@/app/components/Icons/XIcon";
import UserAvatar from "@/app/components/UserAvatar";
import usePlayerStats from "@/app/hooks/usePlayerStats";
import {
  getDisplayNameForAddress,
  calculatePlayerPnL,
  solBalance,
} from "@/app/lib/utils/helpers";
import { Player } from "@/app/types/player";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const ProfileStats = ({ player }: { player: Player }) => {
  const { profile, playerStats } = usePlayerStats();
  const displayUsername = player.twitterUsername
    ? `@${player.twitterUsername}`
    : "@Degen";

  const displayableAddress = getDisplayNameForAddress(player.address);

  const { pnlPercentage, totalPnL } = useMemo(() => {
    if (playerStats) {
      return calculatePlayerPnL(playerStats);
    }
    return { totalPnL: 0, pnlPercentage: 0 };
  }, [playerStats]);
  const stats = [
    {
      title: "Points Earned",
      value: profile.pointsEarned,
    },
    {
      title: (
        <>
          <span>Profit/Loss </span>
          <span
            className={twMerge(
              "text-xs",
              totalPnL < 0 ? "text-danger" : "text-success",
            )}
          >
            {`(${pnlPercentage < 0 ? "" : "+"}${pnlPercentage.toFixed(2)}%)`}
          </span>
        </>
      ),
      value: `${solBalance(totalPnL)}`,
    },
    { title: "Total Volume", value: profile.totalVolume },
  ];

  return (
    <div className="group bg-steel-gray rounded-xl mb-10 lg:mb-20 w-full relative overflow-hidden animate-border bg-none hover:[background:linear-gradient(45deg,#212131,#212131,#212131)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))_border-box] border border-transparent">
      <Image
        src="/profile/hero-profile.jpg"
        alt="Player background"
        width={1920}
        height={1080}
        className="w-full absolute [animation-play-state:paused] group-hover:[animation-play-state:running] animate-bounce-slow"
      />
      <div className="relative z-10 bg-gradient-to-t from-steel-gray from-80% mt-28 px-4 lg:px-8 pb-4">
        <div className="flex items-center gap-6 my-8">
          <div className="w-32 h-12 relative">
            <UserAvatar
              src={player.twitterPfpUrl}
              address={displayableAddress}
              width={120}
              height={120}
              className="rounded-full absolute bottom-0"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{displayUsername}</h1>
              {player.twitterUsername && (
                <Link href={`https://x.com/${player.twitterUsername}`}>
                  <XIcon width={24} height={24} />
                </Link>
              )}
            </div>

            <p className="text-lavender-blue">Address: {displayableAddress}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-flow-col">
          {stats.map(({ title, value }) => (
            <div
              key={title.toString()}
              className="flex justify-center items-center flex-col text-center"
            >
              <p className="text-sm text-lavender-blue">{title}</p>
              <p className="text-md font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;

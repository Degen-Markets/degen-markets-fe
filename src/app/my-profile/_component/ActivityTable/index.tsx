"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DesktopViewTable from "./DesktopViewTable";
import LeaderboardIcon from "@/app/components/Icons/LeaderboardIcon";
import { SectionHeadline } from "@/app/components/Section";
import { PlayerStats } from "@/app/types/player";
import { getPlayerStats } from "@/app/api/players";
import { useWallet } from "@solana/wallet-adapter-react";
import Loader from "@/app/components/Icons/Loader";
import { usePathname } from "next/navigation";

const ActivityTable: React.FC = () => {
  const pathname = usePathname();
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toBase58();
  const [isPlayerStatsLoading, setIsPlayerStatsLoading] =
    useState<boolean>(true);
  const [playerStats, setPlayerStats] = useState<PlayerStats | undefined>();

  const address = useMemo(() => {
    const match = pathname.match(/^\/players\/([^/]+)$/);
    return match ? match[1] : publicKey;
  }, [pathname, publicKey]);

  const fetchPlayerStats = useCallback(async (address: string) => {
    setIsPlayerStatsLoading(true);
    try {
      const { data } = await getPlayerStats(address, {
        sort: { field: "createdAt", direction: "DESC" },
      });
      setPlayerStats(data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    } finally {
      setIsPlayerStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      fetchPlayerStats(address);
    }
  }, [fetchPlayerStats, address]);

  if (isPlayerStatsLoading) {
    return (
      <>
        <SectionHeadline>Activity</SectionHeadline>
        <div className="w-full flex items-center justify-center h-40 space-x-2">
          <Loader />
          <p className="text-xl">Loading Activities...</p>
        </div>
      </>
    );
  }

  if (isPlayerStatsLoading) {
    return (
      <>
        <SectionHeadline>Activity</SectionHeadline>
        <div className="w-full flex items-center justify-center h-40 space-x-2">
          <Loader />
          <p className="text-xl">Loading Activities...</p>
        </div>
      </>
    );
  }

  if (!playerStats?.poolEntries || playerStats.poolEntries.length === 0) {
    return (
      <>
        <SectionHeadline>Activity</SectionHeadline>
        <div className="w-full flex flex-col items-center justify-center h-56">
          <LeaderboardIcon />
          <h3 className="text-center text-xl text-secondary">
            No recent activities.
          </h3>
          <p className="text-sm text-center">
            Participate in markets to see activity here!
          </p>
        </div>
      </>
    );
  }

  return (
    <section>
      <SectionHeadline>Activity</SectionHeadline>
      <DesktopViewTable poolEntries={playerStats.poolEntries} />
    </section>
  );
};

export default ActivityTable;

"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlayerStats } from "@/app/types/player";
import { getPlayerStats } from "@/app/api/players";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname } from "next/navigation";
import {
  formatNumberToSignificantDigits,
  solBalance,
} from "../lib/utils/helpers";
import { useUserProfileContext } from "../context/UserProfileContext";

const initialPlayerStats: PlayerStats = {
  poolEntries: [],
};

const usePlayerStats = () => {
  const { userProfile } = useUserProfileContext();
  const pathname = usePathname();
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toBase58();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playerStats, setPlayerStats] =
    useState<PlayerStats>(initialPlayerStats);

  const address = useMemo(() => {
    const match = pathname.match(/^\/players\/([^/]+)$/);
    return match ? match[1] : publicKey;
  }, [pathname, publicKey]);

  const fetchPlayerStats = useCallback(async (address: string) => {
    setIsLoading(true);
    try {
      const { data } = await getPlayerStats(address);
      setPlayerStats(data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      fetchPlayerStats(address);
    }
  }, [fetchPlayerStats, address]);

  const totalVolume = useMemo(() => {
    if (!playerStats) return 0;
    return playerStats.poolEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.value || "0"),
      0,
    );
  }, [playerStats]);

  const profileImage =
    userProfile?.twitterPfpUrl || "/user-avatars/default.jpg";
  const twitterUsername = userProfile?.twitterUsername || "Degen";

  const profile = useMemo(
    () => ({
      pointsEarned: `${formatNumberToSignificantDigits(userProfile?.points || 0)} Pts`,
      totalVolume: solBalance(totalVolume),
      profileImage,
      twitterUsername,
    }),
    [profileImage, totalVolume, twitterUsername, userProfile],
  );

  return { isLoading, profile, playerStats };
};

export default usePlayerStats;

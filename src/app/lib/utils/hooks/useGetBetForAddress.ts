import { useState, useEffect } from "react";
import { getBetsForAddress } from "../api/getBetsForAddress";
import { BetResponse } from "../bets/types";

const useGetBetForAddress = (address: `0x${string}`) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bets, setBets] = useState<BetResponse[]>([]);
  const [unclaimedBets, setUnclaimedBets] = useState<BetResponse[]>([]);

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      const { data: bets } = await getBetsForAddress(address);
      const unclaimed = bets.filter(
        (bet: BetResponse) =>
          !bet.isPaid && bet.winner?.toLowerCase() === address.toLowerCase(),
      );
      setUnclaimedBets(unclaimed);
      setBets(bets);
    } catch (error) {
      console.error("Error fetching bets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchBetsByAddress(address);
    }
  }, [address]);

  return { isLoading, bets, unclaimedBets, fetchBetsByAddress };
};

export default useGetBetForAddress;

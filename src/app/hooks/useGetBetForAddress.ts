import { useState, useEffect } from "react";
import { BetResponse } from "../lib/utils/bets/types";
import { DUMMY_BETS } from "../lib/utils/bets/constants";

const useGetBetForAddress = (address: `0x${string}`) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bets, setBets] = useState<BetResponse[]>([]);
  const [unclaimedBets, setUnclaimedBets] = useState<BetResponse[]>([]);

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      // const { data: bets } = await getBetsForAddress(address);
      const unclaimed = DUMMY_BETS.filter(
        (bet: BetResponse) =>
          !bet.isPaid && bet.winner?.toLowerCase() === address.toLowerCase(),
      );
      setUnclaimedBets(unclaimed);
      setBets(DUMMY_BETS);
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

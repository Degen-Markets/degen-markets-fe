"use client";
import BetCard from "@/app/components/BetCard";
import { getBets } from "@/app/lib/utils/api/getBets";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { zeroAddress } from "viem";
import { DEFAULT_BET_DURATION } from "@/app/lib/utils/bets/constants";

const MyBets = () => {
  const { address } = useAccount();
  const [openBets, setOpenBets] = useState<BetsResponse>([]);
  const [closedBets, setClosedBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBetsByAddress = async (address: `0x${string}` | undefined) => {
    try {
      setIsLoading(true);
      const { data: fetchedBets } = await getBets();
      const currentTime = Date.now();

      const userBets = fetchedBets.filter((bet) => bet.creator === address);
      const userOpenBets = userBets.filter(
        (bet) =>
          (bet.acceptor === null || bet.acceptor === zeroAddress) &&
          parseInt(bet.creationTimestamp) * 1000 + DEFAULT_BET_DURATION >
            currentTime,
      );

      const userClosedBets = userBets.filter(
        (bet) =>
          parseInt(bet.creationTimestamp) * 1000 + DEFAULT_BET_DURATION <=
          currentTime,
      );

      setOpenBets(userOpenBets);
      setClosedBets(userClosedBets);
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

  if (!address) {
    return (
      <div className="text-center text-4xl">
        Please connect to view your bets.
      </div>
    );
  }

  return (
    <div>
      {isLoading && <div className="text-center text-4xl">Loading...</div>}

      {openBets.length > 0 && (
        <div className="text-center text-7xl">Open Bets:</div>
      )}
      <div className="p-5 flex flex-wrap gap-[40px] justify-center">
        {openBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>

      {closedBets.length > 0 && (
        <div className="text-center text-7xl">Closed Bets:</div>
      )}
      <div className="p-5 flex flex-wrap gap-[40px] justify-center">
        {closedBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  );
};

export default MyBets;

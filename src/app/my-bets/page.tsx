"use client";
import BetCard from "@/app/components/BetCard";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { zeroAddress } from "viem";
import { BET_ACCEPTANCE_TIME_LIMIT_IN_MS } from "@/app/lib/utils/bets/constants";
import useToast from "@/app/components/Toast/useToast";
import { getBetsByCreator } from "@/app/lib/utils/api/getBetsByCreator";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const [openBets, setOpenBets] = useState<BetsResponse>([]);
  const [closedBets, setClosedBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { ToastComponent } = useToast();

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      const currentTime = Date.now();
      const { data: bets } = await getBetsByCreator(address);
      const userOpenBets = bets.filter(
        (bet) =>
          (bet.acceptor === null || bet.acceptor === zeroAddress) &&
          !bet.isWithdrawn &&
          parseInt(bet.creationTimestamp) * 1000 +
            BET_ACCEPTANCE_TIME_LIMIT_IN_MS >
            currentTime,
      );
      const userClosedBets = bets.filter(
        (bet) =>
          bet.isWithdrawn ||
          parseInt(bet.creationTimestamp) * 1000 +
            BET_ACCEPTANCE_TIME_LIMIT_IN_MS <=
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

  if (!isConnected) {
    return (
      <div className="text-center text-4xl">
        Please connect to view your bets.
      </div>
    );
  }

  return (
    <>
      {isLoading && <div className="text-center text-4xl">Loading...</div>}
      {openBets.length === 0 && closedBets.length === 0 && (
        <div className="text-center text-4xl">
          You currently do not have any bets.
        </div>
      )}
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

      {ToastComponent}
    </>
  );
};

export default MyBets;

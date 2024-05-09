"use client";
import BetCard from "@/app/components/BetCard";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { zeroAddress } from "viem";
import { BET_ACCEPTANCE_TIME_LIMIT_IN_MS } from "@/app/lib/utils/bets/constants";
import { getBetsByCreator } from "@/app/lib/utils/api/getBetsByCreator";
import { isBetWithdrawable } from "@/app/lib/utils/bets/helpers";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const [openBets, setOpenBets] = useState<BetsResponse>([]);
  const [closedBets, setClosedBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      const { data: bets } = await getBetsByCreator(address);
      setOpenBets(bets.filter(isBetWithdrawable));
      setClosedBets(bets.filter((bet) => !isBetWithdrawable(bet)));
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
      <div className="text-center text-xl md:text-2xl">
        Please connect to view your bets.
      </div>
    );
  }
  return (
    <>
      {isLoading && (
        <div className="text-center text-xl md:text-2xl">Loading...</div>
      )}
      {openBets.length === 0 && closedBets.length === 0 && (
        <div className="text-center text-xl md:text-2xl">
          You currently do not have any bets.
        </div>
      )}
      {openBets.length > 0 && (
        <div className="text-center text-4xl md:text-7xl">Back out?</div>
      )}
      <div className="p-5 flex flex-wrap gap-[40px] justify-center">
        {openBets.map((bet) => (
          <BetCard
            key={bet.id}
            bet={bet}
            onWithdraw={() => address && fetchBetsByAddress(address)}
          />
        ))}
      </div>

      {closedBets.length > 0 && (
        <div className="text-center text-4xl md:text-7xl">Good luck!</div>
      )}
      <div className="p-5 flex flex-wrap gap-[40px] justify-center">
        {closedBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </>
  );
};

export default MyBets;

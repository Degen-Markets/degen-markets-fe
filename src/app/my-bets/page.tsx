"use client";
import BetCard from "@/app/components/BetCard";
import { getBets } from "@/app/lib/utils/api/getBets";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";

const MyBets = () => {
  const { address } = useAccount();
  const [bets, setBets] = useState<BetsResponse>([]);

  const fetchBetsByAddress = async (address: `0x${string}` | undefined) => {
    try {
      const { data: betsResponse } = await getBets();
      const betForGivenAddress = betsResponse.filter(
        (bet) => bet.creator === address,
      );
      setBets(betForGivenAddress);
    } catch (error) {
      console.error("Error fetching bets:", error);
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
      {bets.length > 0 && (
        <>
          <div className="text-center text-7xl">Your Bets:</div>
          <div className="p-5 flex flex-wrap gap-[40px] justify-center">
            {bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBets;

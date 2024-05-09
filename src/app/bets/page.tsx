"use client";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBets } from "@/app/lib/utils/api/getBets";
import BetCard from "@/app/components/BetCard";
import RecentActivity from "@/app/bets/_components/RecentActivity";
import {
  isBetOpen,
  isBetRunning,
  isBetConcluded,
} from "@/app/lib/utils/bets/helpers";

const Bets = () => {
  const [unacceptedBets, setUnacceptedBets] = useState<BetsResponse>([]);
  const [runningBets, setRunningBets] = useState<BetsResponse>([]);
  const [concludedBets, setConcludedBets] = useState<BetsResponse>([]);
  const fetchBets = async () => {
    const { data: fetchedBets } = await getBets();
    setUnacceptedBets(fetchedBets.filter(isBetOpen));
    setRunningBets(fetchedBets.filter(isBetRunning));
    setConcludedBets(fetchedBets.filter(isBetConcluded));
  };
  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col md:w-3/4 h-screen overflow-y-scroll">
        {unacceptedBets.length > 0 && (
          <>
            <div className="text-center text-4xl md:text-7xl">
              Accept the challenge
            </div>
            <div className="p-5 flex flex-wrap gap-5 justify-center">
              {unacceptedBets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </>
        )}
        {runningBets.length > 0 && (
          <>
            <div className="text-center text-4xl md:text-7xl">
              Current battles
            </div>
            <div className="p-5 flex flex-wrap gap-5 justify-center">
              {runningBets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </>
        )}
        <div className="text-center text-4xl md:text-7xl">Payouts</div>
        <div className="p-5 flex flex-wrap gap-5 justify-center">
          {concludedBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      </div>
      <div className="hidden lg:flex md:w-1/4">
        <RecentActivity />
      </div>
    </div>
  );
};

export default Bets;

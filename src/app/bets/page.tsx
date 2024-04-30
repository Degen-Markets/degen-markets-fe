"use client";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBets } from "@/app/lib/utils/api/getBets";
import BetCard from "@/app/components/BetCard";
import { zeroAddress } from "viem";
import { BET_ACCEPTANCE_TIME_LIMIT_IN_MS } from "@/app/lib/utils/bets/constants";
import RecentActivity from "@/app/bets/_components/RecentActivity";

const Bets = () => {
  const [expiredBets, setExpiredBets] = useState<BetsResponse>([]);
  const [openBets, setOpenBets] = useState<BetsResponse>([]);
  const fetchBets = async () => {
    const { data: fetchedBets } = await getBets();
    const openBets = fetchedBets.filter(
      (bet) =>
        (bet.acceptor === null || bet.acceptor === zeroAddress) &&
        parseInt(bet.creationTimestamp) * 1000 +
          BET_ACCEPTANCE_TIME_LIMIT_IN_MS >
          Date.now(),
    );
    const oldBets = fetchedBets.filter(
      (bet) =>
        parseInt(bet.creationTimestamp) * 1000 +
          BET_ACCEPTANCE_TIME_LIMIT_IN_MS <=
        Date.now(),
    );
    setExpiredBets(oldBets);
    setOpenBets(openBets);
  };
  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col w-3/4 h-screen overflow-y-scroll">
        {openBets.length > 0 && (
          <>
            <div className="text-center text-7xl">Open Bets:</div>
            <div className="p-5 flex flex-wrap gap-5 justify-center">
              {openBets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </>
        )}
        <div className="text-center text-7xl">Closed Bets:</div>
        <div className="p-5 flex flex-wrap gap-5 justify-center">
          {expiredBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      </div>
      <div className="flex w-1/4 w-full">
        <RecentActivity />
      </div>
      {/* Recent Activity */}
    </div>
  );
};

export default Bets;

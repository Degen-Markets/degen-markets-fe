"use client";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBets } from "@/app/lib/utils/api/getBets";
import BetCard from "@/app/components/BetCard";
import { zeroAddress } from "viem";
import { BET_ACCEPTANCE_TIME_LIMIT_IN_MS } from "@/app/lib/utils/bets/constants";

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
    <div>
      {openBets.length > 0 && (
        <>
          <div className="text-center text-7xl">Open Bets:</div>
          <div className="p-5 flex flex-wrap gap-[40px] justify-center">
            {openBets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        </>
      )}
      <div className="text-center text-7xl">Closed Bets:</div>
      <div className="p-5 flex flex-wrap gap-[40px] justify-center">
        {expiredBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  );
};

export default Bets;

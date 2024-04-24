"use client";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBets } from "@/app/lib/utils/api/getBets";
import BetCard from "@/app/components/BetCard";
import { zeroAddress } from "viem";

const Bets = () => {
  const [bets, setBets] = useState<BetsResponse>([]);
  const [validBets, setValidBets] = useState<BetsResponse>([]);
  const fetchBets = async () => {
    const { data: fetchedBets } = await getBets();
    const unacceptedValidBets = fetchedBets.filter(
      (bet) => bet.acceptor === null || bet.acceptor === zeroAddress /* &&
          parseInt(bet.creationTimestamp) + parseInt(bet.duration) * 1000 > Date.now(), */, // TODO: check bet not expired
    );
    setBets(fetchedBets);
    setValidBets(unacceptedValidBets);
  };
  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <div>
      <div className="text-center text-7xl">Unaccepted Bets:</div>
      <div className="p-5 flex flex-wrap gap-[40px] justify-center">
        {validBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  );
};

export default Bets;

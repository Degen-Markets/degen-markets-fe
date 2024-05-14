"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { BetResponse } from "@/app/lib/utils/bets/types";
import WonBet from "@/app/bets/[id]/_components/WonBet";
import AcceptedBet from "@/app/bets/[id]/_components/AcceptedBet";
import BetThat from "@/app/bets/[id]/_components/BetThat";

const BetPage = ({ params: { id } }: { params: { id: string } }) => {
  const [bet, setBet] = useState<BetResponse | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchBet = async () => {
      try {
        const { data: fetchedBet } = await getBetById(id);
        setBet(fetchedBet);
      } catch (error) {
        console.error("Error fetching bet:", error);
      }
    };
    fetchBet();
  }, [id]);

  if (!bet) return null;

  const { creator, acceptor, winner, expirationTimestamp } = bet;
  const loser = winner ? (winner === creator ? acceptor : creator) : null;

  return (
    <div className="w-[80%] md:w-1/2 mx-auto">
      {winner && loser && <WonBet bet={bet} />}
      {!winner && acceptor && creator && <AcceptedBet bet={bet} />}
      {!winner && !acceptor && address && (
        <BetThat bet={bet} address={address} />
      )}
    </div>
  );
};

export default BetPage;

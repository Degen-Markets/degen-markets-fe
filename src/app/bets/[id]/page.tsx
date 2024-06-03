"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { BetResponse } from "@/app/lib/utils/bets/types";
import WonBet from "@/app/bets/[id]/_components/WonBet";
import AcceptedBet from "@/app/bets/[id]/_components/AcceptedBet";
import InProgressBet from "@/app/bets/[id]/_components/InProgressBet";
import BetLayout from "@/app/layouts/BetLayout";

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

  const { acceptor, winner } = bet;

  return (
    <BetLayout>
      {winner && <WonBet bet={bet} />}
      {!winner && acceptor && <AcceptedBet bet={bet} />}
      {!winner && !acceptor && <InProgressBet bet={bet} address={address} />}
    </BetLayout>
  );
};

export default BetPage;

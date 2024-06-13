"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { BetResponse } from "@/app/lib/utils/bets/types";
import WonBet from "@/app/bets/[id]/_components/WonBet";
import AcceptedBet from "@/app/bets/[id]/_components/AcceptedBet";
import InProgressBet from "@/app/bets/[id]/_components/InprogressBet/InProgressBet";
import BetLayout from "@/app/layouts/BetLayout";
import { twMerge } from "tailwind-merge";

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
  console.log("BetPage re-render");

  return (
    <BetLayout
      className={twMerge(
        bet.type === "closest-guess-wins" && "lg:max-w-screen-xl ",
      )}
    >
      {winner && <WonBet bet={bet} />}
      {!winner && acceptor && <AcceptedBet bet={bet} />}
      {!winner && !acceptor && <InProgressBet bet={bet} address={address} />}
    </BetLayout>
  );
};

export default BetPage;

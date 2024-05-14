"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { BetResponse } from "@/app/lib/utils/bets/types";
import WonBet from "@/app/bets/[id]/_compoenets/WonBet";
import AcceptedBet from "@/app/bets/[id]/_compoenets/AcceptedBet";
import BetThat from "@/app/bets/[id]/_compoenets/BetThat";

const BetPage = ({ params: { id } }: { params: { id: string } }) => {
  const [bet, setBet] = useState<BetResponse | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchBet = async () => {
      try {
        const { data: bet } = await getBetById(id);
        setBet(bet);
      } catch (error) {
        console.error("Error fetching bet:", error);
      }
    };
    fetchBet();
  }, [id]);

  if (!bet) return null;

  const { creator, acceptor, winner, expirationTimestamp } = bet;
  const isCreatedByCurrentUser = creator === address;
  const loser = winner ? (winner === creator ? acceptor : creator) : null;
  const showWonBet = winner && loser;
  const showAcceptedBet =
    !showWonBet && acceptor && creator && expirationTimestamp;
  const showBetThat = !showAcceptedBet && isCreatedByCurrentUser;

  return (
    <div className="w-[80%] md:w-1/2 mx-auto">
      {showWonBet && <WonBet bet={bet} />}
      {showAcceptedBet && (
        <>
          <AcceptedBet bet={bet} />
        </>
      )}
      {showBetThat && address && <BetThat bet={bet} address={address} />}
    </div>
  );
};

export default BetPage;

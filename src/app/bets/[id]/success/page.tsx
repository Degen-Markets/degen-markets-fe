"use client";
import { useParams } from "next/navigation";
import AcceptedBet from "@/app/bets/[id]/_components/AcceptedBet";
import { useEffect, useState } from "react";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import Wrapper from "@/app/components/Wrapper";
import { useAccount } from "wagmi";

const AcceptBetSuccess = () => {
  const { id } = useParams<{ id?: string }>();
  const { address } = useAccount();

  const [bet, setBet] = useState<BetResponse | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBet = async () => {
        try {
          const { data: bet } = await getBetById(id);
          setBet(bet);
        } catch (error) {
          console.error("Error fetching bet:", error);
        }
      };
      fetchBet();
    }
  }, [id]);

  if (!bet) return null;

  return (
    <main className="text-center">
      <Wrapper className="lg:max-w-screen-md">
        <AcceptedBet
          bet={{
            ...bet,
            acceptor: bet.acceptor || address || null, // use connected wallet if acceptor is null
          }}
        />
      </Wrapper>
    </main>
  );
};
export default AcceptBetSuccess;

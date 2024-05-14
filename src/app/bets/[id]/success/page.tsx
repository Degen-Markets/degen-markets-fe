"use client";
import { useParams } from "next/navigation";
import AcceptedBet from "@/app/bets/[id]/_components/AcceptedBet";
import { useEffect, useState } from "react";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { getBetById } from "@/app/lib/utils/api/getBetById";

const AcceptBetSuccess = () => {
  const { id } = useParams<{ id?: string }>();

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
      <div className="w-[80%] md:w-1/2 mx-auto">
        <AcceptedBet bet={bet} />
      </div>
    </main>
  );
};
export default AcceptBetSuccess;

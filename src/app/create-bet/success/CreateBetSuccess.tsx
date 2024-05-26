"use client";

import { BET_ACCEPTANCE_TIME_LIMIT } from "@/app/lib/utils/bets/constants";
import { useSearchParams } from "next/navigation";
import BetCountdown from "@/app/components/BetCoundown";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import shareContent from "@/app/lib/utils/shareContent";
import { useEffect, useState } from "react";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { getBetById } from "@/app/lib/utils/api/getBetById";

const CreateBetSuccess = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [bet, setBet] = useState<BetResponse | null>(null);

  useEffect(() => {
    const fetchBet = async () => {
      if (!!id) {
        try {
          const { data: fetchedBet } = await getBetById(id);
          setBet(fetchedBet);
        } catch (error) {
          console.error("Error fetching bet:", error);
        }
      }
    };
    fetchBet();
  }, [id]);
  const creationTimestamp = bet?.creationTimestamp || "0";
  const ticker = bet?.ticker || "";
  const metric = bet?.metric || "";
  const direction = bet?.isBetOnUp === true ? "up" : "down";

  const handleShare = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/bets/${id}`;
    shareContent("Check out my bet!", "I just made a bet! Check it out:", url);
  };

  const handleCopy = async () => {
    const url = `${window.location.protocol}//${window.location.hostname}/bets/${id}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <main className="text-center">
      <Heading className="mb-8">
        <Headline>Bet Created!</Headline>
        <SubHeadline isTop={false}>
          <BetCountdown
            expirationTimestampInS={
              Number(creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT
            }
          />
        </SubHeadline>
      </Heading>

      <br />
      <br />
      <br />
      <div className="text-blue-dark">
        Your bet on {ticker}&apos;s {metric} going {direction} was successfully
        created!
        <br />
        Challenge your frens by giving them a link to this bet. They have 4
        hours to accept!
      </div>
      <br />
      <br />
      <div className="flex justify-center gap-[60px]">
        <button
          className="text-blue-dark bg-pink-light px-3 py-1 border-2 border-blue-dark"
          onClick={handleShare}
        >
          Share
        </button>
        <button
          className="text-blue-dark bg-pink-light px-3 py-1 border-2 border-blue-dark"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </main>
  );
};
export default CreateBetSuccess;

"use client";

import { BET_ACCEPTANCE_TIME_LIMIT } from "@/app/lib/utils/bets/constants";
import { useSearchParams } from "next/navigation";
import BetCountdown from "@/app/components/BetCoundown";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import shareContent from "@/app/lib/utils/shareContent";
import { useEffect, useState } from "react";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { ButtonGradient } from "@/app/components/Button";

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
  const creationTimestamp = bet?.creationTimestamp;
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
    <div className="text-center">
      <Heading>
        <Headline>Bet Created!</Headline>
        {creationTimestamp && (
          <SubHeadline isTop={false}>
            <BetCountdown
              expirationTimestampInS={
                Number(creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT
              }
            />
          </SubHeadline>
        )}
      </Heading>
      <div className="flex flex-col items-center gap-6">
        <div className="text-prussian-dark text-center">
          Your bet on {ticker}&apos;s {metric} going {direction} was
          successfully created! Challenge your frens by giving them a link to
          this bet. They have 4 hours to accept!
        </div>
        <div className="flex gap-6">
          <ButtonGradient size="regular" onClick={handleCopy}>
            Copy bet link!
          </ButtonGradient>
          <ButtonGradient size="regular" onClick={handleShare}>
            Share
          </ButtonGradient>
        </div>
      </div>
    </div>
  );
};
export default CreateBetSuccess;

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
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import Link from "next/link";

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
  const betType =
    bet?.type === "binary" ? "Bull or Bear" : "The Price is Right";

  console.log({
    betDetail: bet,
  });

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
    <div className=" flex-col md:flex-row flex justify-center items-center md:items-start w-full max-w-7xl mx-auto lg:gap-5">
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
          <div className="text-white text-center">
            Your bet on {ticker}&apos;s {metric} going {direction} was
            successfully created! Challenge your frens by giving them a link to
            this bet. They have 4 hours to accept!
          </div>
          <div className="flex gap-6">
            <Link href={`/bets/${id}`}>
              <ButtonGradient
                size="regular"
                className="rounded-xl"
                onClick={handleCopy}
              >
                Copy bet link!
              </ButtonGradient>
            </Link>
            <ButtonGradient
              size="regular"
              className="rounded-xl"
              onClick={handleShare}
            >
              Share
            </ButtonGradient>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl  overflow-y-auto md:sticky md:top-10 mx-4">
        <RecentActivity />
      </div>
    </div>
  );
};
export default CreateBetSuccess;

"use client";

import { useReadContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import {
  BET_ACCEPTANCE_TIME_LIMIT,
  DEGEN_MARKETS_ADDRESS,
} from "@/app/lib/utils/bets/constants";
import { useSearchParams } from "next/navigation";
import BetCountdown from "@/app/components/BetCoundown";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import shareContent from "@/app/lib/utils/shareContent";

const CreateBetSuccess = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data }: { data?: any[] } = useReadContract({
    abi: DEGEN_MARKETS_ABI,
    address: DEGEN_MARKETS_ADDRESS,
    functionName: "betIdToBet",
    args: [id],
  });
  const creationTimestamp = data ? data[2] : 0;
  const ticker = data ? data[3] : "";
  const metric = data ? data[4] : "";
  const direction = data ? (data[5] === true ? "up" : "down") : "";

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

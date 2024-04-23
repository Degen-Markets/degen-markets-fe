"use client";

import PixelatedHeadingContainer from "@/app/components/PixelatedHeadingContainer";
import { useReadContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { DEGEN_MARKETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { useParams, useSearchParams } from "next/navigation";
import BetCountdown from "@/app/components/BetCoundown";

const AcceptBetSuccess = () => {
  const searchParams = useParams<{ id?: string }>();
  const id = searchParams.id;
  const { data }: { data?: any[] } = useReadContract({
    abi: DEGEN_MARKETS_ABI,
    address: DEGEN_MARKETS_ADDRESS,
    functionName: "betIdToBet",
    args: [id],
  });
  const creationTimestamp = data ? data[2] : 0;
  const ticker = data ? data[3] : "";
  const metric = data ? data[4] : "";
  const oppositeDirection = data ? (data[6] === true ? "down" : "up") : "";
  const durationInMs = data ? parseInt(data[6]) * 1000 : 0;

  return (
    <main className="text-center">
      <div className="flex justify-center">
        <PixelatedHeadingContainer classNames="my-10 w-[500px]">
          Bet Accepted!
        </PixelatedHeadingContainer>
      </div>
      <div className="flex justify-center">
        <BetCountdown
          classNames="bg-blue-dark w-max p-2 border-2 border-yellow-dark"
          betCreationTimestamp={creationTimestamp}
          duration={durationInMs}
          message="Bet ends in"
        />
      </div>
      <br />
      <br />
      <br />
      <div className="text-blue-dark">
        So you think {ticker}&apos;s {metric} is going {oppositeDirection}?
        Let&apos;s see who wins!
      </div>
    </main>
  );
};
export default AcceptBetSuccess;

"use client";

import PixelatedHeadingContainer from "@/app/components/PixelatedHeadingContainer";
import { useReadContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { DEGEN_MARKETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { useSearchParams } from "next/navigation";
import BetCountdown from "@/app/components/BetCoundown";

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
  const ticker = data ? data[4] : "";
  const metric = data ? data[5] : "";
  const direction = data ? (data[6] === true ? "up" : "down") : "";

  const handleShare = () => {
    if (navigator.share) {
      const url = `${window.location.protocol}//${window.location.hostname}/accept-bet/${id}`;

      navigator
        .share({
          title: "Check out my bet!",
          text: "I just made a bet! Check it out:",
          url: url,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  const handleCopy = async () => {
    const url = `${window.location.protocol}//${window.location.hostname}/accept-bet/${id}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <main className="text-center">
      <div className="flex justify-center">
        <PixelatedHeadingContainer classNames="my-10 w-[500px]">
          Bet Created!
        </PixelatedHeadingContainer>
      </div>
      <div className="flex justify-center">
        <BetCountdown
          classNames="bg-blue-dark w-max p-2 border-2 border-yellow-dark"
          betCreationTimestamp={creationTimestamp}
          duration={60 * 60 * 4 * 1000}
        />
      </div>
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
          className="text-blue-dark bg-yellow-dark px-3 py-1 border-2 border-blue-dark"
          onClick={handleShare}
        >
          Share
        </button>
        <button
          className="text-blue-dark bg-yellow-dark px-3 py-1 border-2 border-blue-dark"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </main>
  );
};
export default CreateBetSuccess;

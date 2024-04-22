"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useReadContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "../../lib/utils/bets/abis";
import {
  DEGEN_MARKETS_ADDRESS,
  STABLECOIN_DECIMALS,
} from "../../lib/utils/bets/constants";
import { CreatedBetObject } from "@/app/lib/utils/bets/types";
import { type UseReadContractReturnType } from "wagmi";
import BetCoundown from "@/app/components/BetCoundown";
import { betDurationInDays } from "@/app/lib/utils/bets/helpers";
import { formatUnits, erc20Abi } from "viem";

const AcceptBetPage = ({ params }: { params: { id: string } }) => {
  const [betToAccept, setBetToAccept] = useState<
    CreatedBetObject | undefined
  >();
  const betId = params.id;

  const result: UseReadContractReturnType = useReadContract({
    abi: DEGEN_MARKETS_ABI,
    address: DEGEN_MARKETS_ADDRESS,
    functionName: "betIdToBet",
    args: [betId],
  });

  useEffect(() => {
    if (Array.isArray(result.data) && result.data.length >= 11) {
      const localBet: CreatedBetObject = {
        id: result.data[0],
        creator: result.data[1],
        creationTimestamp: result.data[2].toString(),
        ticker: result.data[3],
        metric: result.data[4],
        isBetOnUp: result.data[5],
        duration: result.data[6].toString(),
        value: formatUnits(result.data[9], STABLECOIN_DECIMALS),
        currency: `0x${result.data[7]}`,
      };

      setBetToAccept(localBet);
    } else {
      console.log(
        "Data is not available or not in expected format:",
        result.data,
      );
    }
  }, [result.data]);

  return (
    <>
      <div className="h-screen w-full">
        {result && betToAccept && (
          <>
            <div className="w-1/2">
              <BetCoundown
                betCreationTimestamp={betToAccept.creationTimestamp}
              />
            </div>
            <div className="flex flex-col">
              <div className="bg-amber-400 border-white">
                {betToAccept.creator}
              </div>
              <div>Bets that:</div>
            </div>

            <div className="flex">
              <div className="bg-white border-amber-400 border-4 text-neutral-800">
                {betToAccept.ticker} - {betToAccept.metric} will{" "}
                {betToAccept.isBetOnUp ? "moon" : "rug"} in{" "}
                {betDurationInDays(betToAccept.duration)}
              </div>
              <div className="bg-white border-amber-400 border-4 text-neutral-800">
                Wagered:&nbsp;{betToAccept.value}&nbsp;
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AcceptBetPage;

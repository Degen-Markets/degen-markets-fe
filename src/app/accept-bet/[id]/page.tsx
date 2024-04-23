"use client";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "../../lib/utils/bets/abis";
import {
  DEGEN_MARKETS_ADDRESS,
  STABLECOIN_DECIMALS,
} from "../../lib/utils/bets/constants";
import { CreatedBetObject } from "@/app/lib/utils/bets/types";
import { type UseReadContractReturnType } from "wagmi";
import BetCoundown from "@/app/components/BetCoundown";
import {
  betDurationInDays,
  getCurrencySymbolByAddress,
} from "@/app/lib/utils/bets/helpers";
import { formatUnits, zeroAddress } from "viem";

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
        value: formatUnits(
          result.data[9],
          result.data[7] === zeroAddress ? 18 : STABLECOIN_DECIMALS,
        ),
        currency: result.data[7],
      };

      setBetToAccept(localBet);
    } else {
      console.error(
        "Data is not available or not in expected format:",
        result.data,
      );
    }
  }, [result.data]);

  return (
    <>
      <div className="h-screen w-full">
        {result && betToAccept && (
          <div className="w-1/2 mx-auto">
            <div className="bg-blue-dark border-amber-400 border-2 text-center w-3/5 mx-auto">
              <BetCoundown
                betCreationTimestamp={betToAccept.creationTimestamp}
              />
            </div>
            <div className="flex flex-col pt-16 pb-10 ">
              <div className="relative">
                <div className="bg-yellow-dark border-white absolute -top-4 py-2 px-4 text-center left-[50%] -translate-x-[50%]">
                  {betToAccept.creator}
                </div>
              </div>
              <div className="bg-blue-dark text-7xl text-center py-10">
                Bets that:
              </div>
            </div>

            <div className="flex justify-center gap-x-4">
              <div className="bg-blue-dark border-amber-400 border-4 text-neutral-800 px-4">
                {betToAccept.ticker} - {betToAccept.metric} will{" "}
                {betToAccept.isBetOnUp ? "moon" : "rug"} in{" "}
                {betDurationInDays(betToAccept.duration)}
              </div>
              <div className="bg-white border-amber-400 border-4 text-neutral-800">
                Wagered:&nbsp;{betToAccept.value}&nbsp;
                {getCurrencySymbolByAddress(betToAccept.currency)}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>Not a chance...</div>
              <div>Approve and bet</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptBetPage;

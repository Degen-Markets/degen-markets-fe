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
      <div className="h-screen w-full flex items-center justify-center">
        {result && betToAccept && (
          <div className="w-1/2 mx-auto">
            <div className="bg-blue-dark border-amber-400 border-2 text-center w-3/5 mx-auto text-3xl py-2">
              <BetCoundown
                betCreationTimestamp={betToAccept.creationTimestamp}
              />
            </div>
            <div className="flex flex-col pt-16 pb-10 ">
              <div className="relative z-20">
                <div className="bg-yellow-dark border-2 text-neutral-950 border-white absolute -top-5 py-2 px-4 text-center left-[50%] -translate-x-[50%] z-20">
                  {betToAccept.creator}
                </div>
              </div>
              <div className="relative bg-blue-dark py-20">
                <div className="text-center py-2 ">
                  <div className="absolute items-center top-[50%] translate-y-[calc(50%-150px)] bg-blue-dark w-[calc(100%+32px)] h-[150px] left-[50%] -translate-x-[50%]">
                    <div className="text-[150px] flex items-center h-full justify-center">
                      bets that:
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-x-4">
              <div className="bg-white border-amber-400 border-4 text-neutral-800 px-4">
                {betToAccept.ticker} - {betToAccept.metric} will{" "}
                {betToAccept.isBetOnUp ? "moon" : "rug"} in{" "}
                {betDurationInDays(betToAccept.duration)}
              </div>
              <div className="bg-white border-amber-400 border-4 text-neutral-800 px-4">
                Wagered:&nbsp;{betToAccept.value.substring(0, 6)}&nbsp;
                {getCurrencySymbolByAddress(betToAccept.currency)}
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center pt-10">
              <div className="text-blue-dark">Not a chance...</div>
              <div className="text-blue-dark bg-yellow-dark border-blue-dark border-2 px-6">
                Approve and bet
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptBetPage;

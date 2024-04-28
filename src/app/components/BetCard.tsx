import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import {
  DEFAULT_BET_DURATION,
  DEGEN_MARKETS_ADDRESS,
} from "@/app/lib/utils/bets/constants";
import { prettifyAddress } from "@/app/lib/utils/evm";
import { getHumanFriendlyMetric } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";

const BetCard = ({ bet }: { bet: BetResponse }) => {
  const router = useRouter();
  const { address } = useAccount();
  const isBetExpired =
    parseInt(bet.creationTimestamp) * 1000 + DEFAULT_BET_DURATION <= Date.now();
  const showWithdrawButton = bet.creator === address && !isBetExpired;

  const { writeContract: sendWithdrawBetTx, data: withdrawBetHash } =
    useWriteContract();
  const { isSuccess: isWithdrawBetSuccess } = useTransactionReceipt({
    hash: withdrawBetHash,
  });

  useEffect(() => {
    if (isWithdrawBetSuccess) {
      router.push(`/bets/${bet.id}/success`);
    }
  }, [isWithdrawBetSuccess, bet.id, router]);

  const onWithdraw = () => {
    sendWithdrawBetTx({
      abi: DEGEN_MARKETS_ABI,
      address: DEGEN_MARKETS_ADDRESS,
      functionName: "withdrawBet",
      args: [bet.id],
    });
  };

  const CalToAction = () => (
    <>
      {showWithdrawButton ? (
        <button
          className="flex flex-row masked-button p-1 rounded-full text-3xl w-fit cursor-pointer"
          onClick={onWithdraw}
        >
          <span className="flex flex-row bg-blue-dark rounded-full px-2 py-0.5">
            <span className="masked-button-text flex geo-font cursor-pointer">
              Withdraw
              <span className="gradient-button-arrow flex items-center"></span>
            </span>
          </span>
        </button>
      ) : (
        <Link href={`/bets/${bet.id}`}>
          <button className="flex flex-row masked-button p-1 rounded-full text-3xl w-fit cursor-pointer">
            <span className="flex flex-row bg-blue-dark rounded-full px-2 py-0.5">
              <span className="masked-button-text flex geo-font cursor-pointer">
                {isBetExpired ? "View details" : "Accept bet"}
                <span className="gradient-button-arrow flex items-center"></span>
              </span>
            </span>
          </button>
        </Link>
      )}
    </>
  );

  return (
    <div className="bg-blue-dark p-3 w-[300px] rounded">
      <div className="bg-blue-medium text-blue-dark my-2 p-1">
        {prettifyAddress(bet.creator)} is betting that...
      </div>
      <div className="bg-white text-blue-dark p-1">
        {bet.ticker}&apos;s {getHumanFriendlyMetric(bet.metric)} will go&nbsp;
        {bet.isBetOnUp ? "up" : "down"} in{" "}
        {parseInt(bet.duration) / 60 / 60 / 24} days.
      </div>

      <div className="flex justify-center mt-4">
        <CalToAction />
      </div>
    </div>
  );
};

export default BetCard;

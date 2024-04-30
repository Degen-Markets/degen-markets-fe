import React, { useEffect } from "react";
import Link from "next/link";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import {
  DEFAULT_BET_DURATION,
  DEGEN_MARKETS_ADDRESS,
} from "@/app/lib/utils/bets/constants";
import { prettifyAddress } from "@/app/lib/utils/evm";
import { getHumanFriendlyMetric } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import useToast from "@/app/components/Toast/useToast";
import { ButtonPrimary } from "@/app/components/Button";

const BetCard = ({ bet }: { bet: BetResponse }) => {
  const { showToast } = useToast();
  const { address } = useAccount();
  const isBetExpired =
    parseInt(bet.creationTimestamp) * 1000 + DEFAULT_BET_DURATION <= Date.now();
  const showWithdrawButton = bet.creator === address && !isBetExpired;

  const { writeContract: sendWithdrawBetTx, data: withdrawBetHash } =
    useWriteContract();
  const { isSuccess: isWithdrawBetSuccess, isError: isWithdrawBetError } =
    useTransactionReceipt({
      hash: withdrawBetHash,
    });

  useEffect(() => {
    if (isWithdrawBetSuccess) {
      showToast(
        "Your withdrawal request has been successfully processed!",
        "success",
      );
    }
  }, [isWithdrawBetSuccess, bet.id, showToast]);

  useEffect(() => {
    if (isWithdrawBetError) {
      showToast("Withdrawal failed. Please try again later.", "error");
    }
  }, [isWithdrawBetError, showToast]);

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
        <ButtonPrimary size="regular" onClick={onWithdraw}>
          Withdraw
        </ButtonPrimary>
      ) : (
        <Link href={`/bets/${bet.id}`}>
          <ButtonPrimary size="regular">
            {isBetExpired ? "View details" : "Accept bet"}
          </ButtonPrimary>
        </Link>
      )}
    </>
  );

  return (
    <div className="bg-blue-dark p-3 w-[300px] rounded">
      <div className="bg-blue-medium text-blue-dark my-2 p-1">
        {prettifyAddress(bet.creator)} is betting that...
      </div>
      <div className="bg-white text-blue-dark p-1 h-[72px]">
        {bet.ticker}&apos;s {getHumanFriendlyMetric(bet.metric)} will go&nbsp;
        {bet.isBetOnUp ? "up" : "down"} in{" "}
        {parseInt(bet.expirationTimestamp) / 60 / 60 / 24} days.
      </div>

      <div className="flex justify-center mt-4">
        <CalToAction />
      </div>
    </div>
  );
};

export default BetCard;

import React, { useEffect } from "react";
import Link from "next/link";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import {
  BET_ACCEPTANCE_TIME_LIMIT_IN_MS,
  DEGEN_MARKETS_ADDRESS,
} from "@/app/lib/utils/bets/constants";
import { prettifyAddress } from "@/app/lib/utils/evm";
import { getHumanFriendlyMetric } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { ButtonPrimary } from "@/app/components/Button";
import { useToast } from "@/app/components/Toast/ToastProvider";

interface Props {
  bet: BetResponse;
  onWithdraw?: () => void;
}
const BetCard = ({ bet, onWithdraw }: Props) => {
  const { showToast } = useToast();
  const { address } = useAccount();
  const showWithdrawButton =
    !bet.isWithdrawn && bet.creator === address && bet.acceptor === null;

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
      onWithdraw && onWithdraw();
    }
  }, [isWithdrawBetSuccess]);

  useEffect(() => {
    if (isWithdrawBetError) {
      showToast("Withdrawal failed. Please try again later.", "error");
      onWithdraw && onWithdraw();
    }
  }, [isWithdrawBetError]);

  const onWithdrawClick = () => {
    sendWithdrawBetTx({
      abi: DEGEN_MARKETS_ABI,
      address: DEGEN_MARKETS_ADDRESS,
      functionName: "withdrawBet",
      args: [bet.id],
    });
  };

  const CTAButton = () => {
    if (showWithdrawButton) {
      return (
        <ButtonPrimary size="regular" onClick={onWithdrawClick}>
          Withdraw
        </ButtonPrimary>
      );
    } else {
      return (
        <Link href={`/bets/${bet.id}`}>
          <ButtonPrimary size="regular">
            {showWithdrawButton ? "Accept bet" : "View details"}
          </ButtonPrimary>
        </Link>
      );
    }
  };

  return (
    <>
      <div className="bg-blue-dark p-3 w-[300px] rounded">
        <div className="bg-blue-medium text-blue-dark my-2 p-1">
          {prettifyAddress(bet.creator)} is betting that...
        </div>
        <div className="bg-white text-blue-dark p-1 h-[72px]">
          {bet.ticker}&apos;s {getHumanFriendlyMetric(bet.metric)} will be&nbsp;
          {bet.isBetOnUp ? "up" : "down"} on&nbsp;the&nbsp;
          {new Date(Number(bet.expirationTimestamp) * 1000).toLocaleString()}.
        </div>

        <div className="flex justify-center mt-4">
          <CTAButton />
        </div>
      </div>
    </>
  );
};

export default BetCard;

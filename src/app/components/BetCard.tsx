"use client";

import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { DEGEN_MARKETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { ButtonPrimary } from "@/app/components/Button";
import { useToast } from "@/app/components/Toast/ToastProvider";
import UserAvatar from "@/app/components/UserAvatar";
import ReplicateBetAction from "@/app/bets/[id]/_components/ReplicateBetAction";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import cx from "classnames";
import BetMetric from "@/app/components/BetMetric";
import BetCoundown from "@/app/components/BetCoundown";

interface Props {
  bet: BetResponse;
  onWithdraw?: () => void;
  className?: string;
}

const BetCard: React.FC<Props> = ({ bet, onWithdraw, className }) => {
  const { showToast } = useToast();
  const { address } = useAccount();
  const { creator, acceptor, winner, id, isWithdrawn, expirationTimestamp } =
    bet;

  const showWithdrawButton = !isWithdrawn && creator === address && !acceptor;

  const { writeContract: sendWithdrawBetTx, data: withdrawBetHash } =
    useWriteContract();
  const { isSuccess: isWithdrawBetSuccess, isError: isWithdrawBetError } =
    useTransactionReceipt({ hash: withdrawBetHash });

  useEffect(() => {
    if (isWithdrawBetSuccess) {
      showToast(
        "Your withdrawal request has been successfully processed!",
        "success",
      );
      onWithdraw?.();
    }
  }, [isWithdrawBetSuccess, showToast, onWithdraw]);

  useEffect(() => {
    if (isWithdrawBetError) {
      showToast("Withdrawal failed. Please try again later.", "error");
      onWithdraw?.();
    }
  }, [isWithdrawBetError, showToast, onWithdraw]);

  const onWithdrawClick = useCallback(() => {
    sendWithdrawBetTx({
      abi: DEGEN_MARKETS_ABI,
      address: DEGEN_MARKETS_ADDRESS,
      functionName: "withdrawBet",
      args: [id],
    });
  }, [sendWithdrawBetTx, id]);

  const CTAButton = () => {
    if (showWithdrawButton) {
      return (
        <ButtonPrimary size="regular" onClick={onWithdrawClick}>
          Withdraw
        </ButtonPrimary>
      );
    }
    if (!winner && acceptor) {
      return <ReplicateBetAction bet={bet} />;
    }
    return (
      <Link href={`/bets/${id}`}>
        <ButtonPrimary size="regular">View details</ButtonPrimary>
      </Link>
    );
  };

  return (
    <div
      className={cx("flex flex-col gap-4 items-center", {
        className: className,
      })}
    >
      <div className="bg-blue-dark p-3 border-4 border-white w-full space-y-4">
        <div className="flex items-center justify-center gap-16">
          <div className="flex flex-col gap-1 items-center">
            <UserAvatar
              width={100}
              height={100}
              address={creator}
              className="w-10 h-10 md:w-11 md:h-11"
            />
            <span>{getDisplayNameForAddress(creator)}</span>
          </div>
          <div className="text-2xl md:text-[64px]">VS</div>
          {acceptor && (
            <div className="flex flex-col gap-1 items-center">
              <UserAvatar
                width={100}
                height={100}
                address={acceptor}
                className="w-10 h-10 md:w-11 md:h-11"
              />
              <span>{getDisplayNameForAddress(acceptor)}</span>
            </div>
          )}
        </div>
        <BetMetric bet={bet} />
        <BetCoundown
          classNames="bg-vivid p-2 border-2 border-white text-prussian-dark text-lg"
          expirationTimestampInS={Number(expirationTimestamp)}
          message="Countdown to END of the bet"
        />
      </div>
      <CTAButton />
    </div>
  );
};

export default BetCard;

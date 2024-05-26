"use client";
import { useEffect, useCallback, FC } from "react";
import Link from "next/link";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { ButtonPrimary } from "@/app/components/Button";
import { useToast } from "@/app/components/Toast/ToastProvider";
import UserAvatar from "@/app/components/UserAvatar";
import ReplicateBetAction from "@/app/bets/[id]/_components/ReplicateBetAction";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import cx from "classnames";
import BetMetric from "@/app/components/BetMetric";
import BetCountdown from "@/app/components/BetCoundown";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import { Hash } from "viem";

interface Props {
  bet: BetResponse;
  onWithdraw?: () => void;
  className?: string;
}

const BetCard: FC<Props> = ({ bet, onWithdraw, className }) => {
  const { showToast } = useToast();
  const { address } = useAccount();
  const { creator, acceptor, winner, id, isWithdrawn, expirationTimestamp } =
    bet;
  const loser = winner ? (winner === creator ? acceptor : creator) : null;

  const endTime = Number(expirationTimestamp) * 1000;
  const distance = endTime - Date.now();
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const bgClassForCountDown =
    hours < 5
      ? "bg-vivid-dark"
      : hours < 24
        ? "bg-koromiko-dark"
        : "bg-mantis-dark";
  const bgClassForMetric =
    hours < 5
      ? "bg-vivid-light"
      : hours < 24
        ? "bg-koromiko-light"
        : "bg-mantis-light";

  const createdByCurrentUser = creator === address;
  const showWithdrawButton = createdByCurrentUser && !isWithdrawn && !acceptor;

  const { writeContract: sendWithdrawBetsTx, data: withdrawBetsHash } =
    useWriteContract();
  const { isSuccess: isWithdrawBetSuccess, isError: isWithdrawBetError } =
    useTransactionReceipt({
      hash: withdrawBetsHash,
    });

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
    sendWithdrawBetsTx({
      abi: DEGEN_BETS_ABI,
      address: DEGEN_BETS_ADDRESS,
      functionName: "withdrawBets",
      args: [[id]],
    });
  }, [sendWithdrawBetsTx, id]);

  const CTAButton = () => {
    if (showWithdrawButton) {
      return (
        <ButtonPrimary size="regular" onClick={onWithdrawClick}>
          Withdraw
        </ButtonPrimary>
      );
    }
    if (!createdByCurrentUser && winner == null && acceptor == null) {
      return <AcceptBetButton bet={bet} address={address} />;
    }
    if (!acceptor) {
      return <ReplicateBetAction bet={bet} />;
    }
    return (
      <Link href={`/bets/${id}`}>
        <ButtonPrimary size="regular">View details</ButtonPrimary>
      </Link>
    );
  };

  const UserAvatarWithDisplayName: FC<{ address: Hash }> = ({ address }) => (
    <div className="flex flex-col gap-1 items-center">
      <UserAvatar
        width={100}
        height={100}
        address={address}
        className="w-10 h-10 md:w-11 md:h-11"
      />
      <span>{getDisplayNameForAddress(address)}</span>
    </div>
  );

  const Avatars = () => {
    if (!winner && !loser) {
      return (
        <>
          <UserAvatarWithDisplayName address={creator} />
          {acceptor && <div className="text-2xl md:text-[64px]">VS</div>}
          {acceptor && <UserAvatarWithDisplayName address={acceptor} />}
        </>
      );
    }

    return (
      <>
        {winner && (
          <div className="flex flex-col items-center">
            <UserAvatarWithDisplayName address={winner} />
            <h3 className="uppercase text-3xl text-mantis-dark">Winner</h3>
          </div>
        )}
        <div className="text-2xl md:text-[64px]">VS</div>
        {loser && (
          <div className="flex flex-col items-center">
            <UserAvatarWithDisplayName address={loser} />
            <h3 className="uppercase text-3xl text-vivid-dark">Loser</h3>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={cx("flex flex-col gap-4 items-center", className)}>
      <div className="bg-blue-dark p-3 border-4 border-white w-full space-y-4">
        <div className="flex items-center justify-center gap-16">
          <Avatars />
        </div>
        <div className="flex flex-col items-center -space-y-2 ">
          <BetMetric bet={bet} className={bgClassForMetric} />
          <BetCountdown
            classNames={`p-1 border-2 border-white text-prussian-dark text-lg justify-center w-4/5 ${bgClassForCountDown}`}
            expirationTimestampInS={Number(expirationTimestamp)}
            message="Countdown to END of the bet"
          />
        </div>
      </div>
      <CTAButton />
    </div>
  );
};

export default BetCard;

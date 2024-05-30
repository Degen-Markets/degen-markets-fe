"use client";
import { useCallback, FC, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse, Tx } from "@/app/lib/utils/bets/types";
import { ButtonPrimary } from "@/app/components/Button";
import { useToast } from "@/app/components/Toast/ToastProvider";
import UserAvatar from "@/app/components/UserAvatar";
import ReplicateBetAction from "@/app/bets/[id]/_components/ReplicateBetAction";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import cx from "classnames";
import BetCountdown from "@/app/components/BetCoundown";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import { Hash } from "viem";
import BetMetric from "@/app/components/BetMetric";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { config } from "../providers";
import { base } from "wagmi/chains";

interface Props {
  bet: BetResponse;
  onWithdraw?: () => void;
  className?: string;
}

const BetCard: FC<Props> = ({ bet, onWithdraw, className }) => {
  const { showToast } = useToast();
  const { address } = useAccount();
  const [txState, setTxState] = useState<Tx>(Tx.Idle);

  const isStateIdle = txState === Tx.Idle;

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

  const createdByCurrentUser = creator.toLowerCase() === address?.toLowerCase();
  const showWithdrawButton = createdByCurrentUser && !isWithdrawn && !acceptor;

  const onWithdrawClick = useCallback(async () => {
    try {
      setTxState(Tx.Pending);
      const hash = await writeContract(config, {
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "withdrawBets",
        args: [[id]],
        chainId: base.id,
      });
      setTxState(Tx.Processing);
      const { status } = await waitForTransactionReceipt(config, { hash });
      if (status === "success") {
        showToast(
          "Your withdrawal request has been successfully processed!",
          "success",
        );
        onWithdraw?.();
      }
      if (status === "reverted") {
        showToast("Withdrawal failed. Please try again later.", "error");
        onWithdraw?.();
      }
    } catch (error) {
      console.error("Error creating Bet", error);
      setTxState(Tx.Idle);
    } finally {
      setTxState(Tx.Idle);
    }
  }, [id, onWithdraw, showToast]);

  const CTAButton = () => {
    if (showWithdrawButton) {
      return (
        <ButtonPrimary
          loader={true}
          txState={txState}
          disabled={!isStateIdle}
          size="regular"
          onClick={onWithdrawClick}
        >
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
        <div className="flex items-center justify-center gap-16 md:gap-8 xl:gap-16">
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

import { Button } from "@/app/components/Button";
import { ButtonSuccess } from "@/app/components/Button/ButtonSuccess";
import { ButtonDanger } from "@/app/components/Button/ButtonDanger";
import { BetResponse } from "@/app/lib/utils/bets/types";
import useReplicateBet from "@/app/hooks/useReplicateBet";
import { useRouter } from "next/navigation";
import { FC, useMemo, useCallback, memo, useEffect } from "react";
import { DegenBetsAbi } from "@/app/lib/utils/bets/DegenBetsAbi";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { zeroAddress } from "viem";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { isBetExpired } from "@/app/lib/utils/bets/helpers";
import useIsBalanceEnough from "@/app/hooks/useIsBalanceEnough";
import { base } from "wagmi/chains";

type BetButtonProps = {
  bet: BetResponse;
};

const BetButton: FC<BetButtonProps> = ({ bet }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { address } = useAccount();
  const replicateBet = useReplicateBet(router);

  const { id, currency, value, type, isBetOnUp, creator } = bet;
  const isEth = currency === zeroAddress;
  const valueInWei = useMemo(() => BigInt(value), [value]);

  const isBalanceEnough = useIsBalanceEnough(currency, valueInWei);

  const {
    data: betAcceptHash,
    writeContractAsync: sendAcceptBetTx,
    isPending: isAcceptButtonPending,
  } = useWriteContract();
  const createdByCurrentUser = useMemo(
    () => creator.toLowerCase() === address?.toLowerCase(),
    [creator, address],
  );
  const {
    isSuccess: isBetAcceptedSuccess,
    error: betAcceptanceError,
    isLoading: isApprovalProcessing,
  } = useTransactionReceipt({
    hash: betAcceptHash,
    chainId: base.id,
  });

  const isDisabled = isAcceptButtonPending;

  const acceptBet = useCallback(async () => {
    try {
      await sendAcceptBetTx({
        abi: DegenBetsAbi,
        address: DEGEN_BETS_ADDRESS,
        functionName: "acceptBet",
        args: [id, ""],
        value: isEth ? valueInWei : (undefined as any),
      });
    } catch (error: any) {
      console.error(error);
      showToast(error.shortMessage ?? error, "error");
    }
  }, [sendAcceptBetTx, id, isEth, valueInWei, showToast]);

  const handleOnClick = useCallback(async () => {
    if (!isBalanceEnough) {
      replicateBet({
        ...bet,
        isBetOnUp: type === "binary" ? !isBetOnUp : isBetOnUp,
      });
    } else {
      await acceptBet();
    }
  }, [isBalanceEnough, replicateBet, bet, type, isBetOnUp, acceptBet]);

  useEffect(() => {
    if (isBetAcceptedSuccess) {
      router.push(`/bets/${id}/success`);
    }
  }, [isBetAcceptedSuccess, id, router]);

  const renderButton = useCallback(() => {
    if (
      !isBalanceEnough ||
      bet.acceptor === null ||
      isBetExpired(bet) ||
      createdByCurrentUser
    ) {
      return (
        <Button
          size="small"
          className="uppercase text-xs lg:text-base"
          onClick={handleOnClick}
          disabled={isDisabled}
        >
          Replicate
        </Button>
      );
    }

    if (type === "closest-guess-wins") {
      return (
        <Button
          size="small"
          className="uppercase text-xs lg:text-base"
          onClick={handleOnClick}
          disabled={isDisabled}
        >
          PREDICT NOW
        </Button>
      );
    }

    return isBetOnUp ? (
      <ButtonDanger
        size="small"
        className="uppercase text-xs lg:text-base"
        onClick={handleOnClick}
        disabled={isDisabled}
      >
        Bet down
      </ButtonDanger>
    ) : (
      <ButtonSuccess
        size="small"
        className="uppercase text-xs lg:text-base"
        onClick={handleOnClick}
        disabled={isDisabled}
      >
        Bet up
      </ButtonSuccess>
    );
  }, [
    isBalanceEnough,
    isBetExpired,
    bet,
    createdByCurrentUser,
    handleOnClick,
    isDisabled,
    type,
    isBetOnUp,
    isBetExpired,
  ]);

  return renderButton();
};

export default memo(BetButton);

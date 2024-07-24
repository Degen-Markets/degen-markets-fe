"use client";

import React, { useEffect } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { parseEther, zeroAddress } from "viem";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import {
  DEGEN_BETS_ADDRESS,
  SIX_HOURS_BET_DURATION,
} from "@/app/lib/utils/bets/constants";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { twMerge } from "tailwind-merge";
import { DegenBetsAbi } from "@/app/lib/utils/bets/DegenBetsAbi";
import { ButtonSuccess } from "@/app/components/Button/ButtonSuccess";
import { ButtonDanger } from "@/app/components/Button/ButtonDanger";

const LiteBetButton: React.FC<{ isBetUp: boolean; className?: string }> = ({
  isBetUp,
  className,
}) => {
  const router = useRouter();
  const {
    value,
    currency,
    strikePriceCreator,
    error: createBetError,
  } = useBetContext();

  const { address } = useAccount();

  const { showToast } = useToast();

  const {
    writeContractAsync: sendCreateBetTx,
    data: createBetHash,
    variables: createBetVariables,
    isPending: isCreateBetButtonPending,
  } = useWriteContract();
  const {
    isSuccess: isCreateBetTxSuccess,
    error: betCreationError,
    isLoading: isCreateBetProcessing,
  } = useTransactionReceipt({
    hash: createBetHash,
    chainId: base.id,
  });

  const { userBalances } = useBalances(isCreateBetTxSuccess, address);
  const valueInWei = parseEther(value);

  const id = createBetVariables?.args && createBetVariables.args[0];

  const isBalanceEnough = userBalances["ETH"] >= valueInWei;

  const isPending = isCreateBetButtonPending;
  const isProcessing = isCreateBetProcessing;

  const isActionDisabled =
    !isBalanceEnough ||
    !address ||
    Number(value) <= 0 ||
    isPending ||
    isProcessing ||
    !!createBetError;

  const createBet = async () => {
    const betDirection = isBetUp;
    const randomId = uuid();
    const value = valueInWei as any;
    console.log({
      randomId,
      betType: "binary",
      durationValue: BigInt(SIX_HOURS_BET_DURATION),
      TickerValue: "ETH",
      MaticValue: "price",
      strikePriceCreator,
      Direction: isBetUp,
      valueInWei,
      Currency: currency.value,
    });

    try {
      await sendCreateBetTx({
        abi: DegenBetsAbi,
        address: DEGEN_BETS_ADDRESS,
        functionName: "createBet",
        args: [
          randomId,
          "binary",
          BigInt(SIX_HOURS_BET_DURATION),
          "ETH",
          "price",
          strikePriceCreator,
          betDirection,
          valueInWei,
          zeroAddress,
        ],
        value,
        chainId: base.id,
      });
    } catch (error: any) {
      showToast(error.shortMessage, "error");
      console.error(error);
    }
  };

  const handleActionButtonClick = async () => {
    createBet();
  };

  const getActionButtonText = (): string => {
    if (!!createBetError) {
      return createBetError;
    }
    if (!address) {
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    return isBetUp ? "Bet Up" : "Bet Down";
  };

  useEffect(() => {
    if (!!betCreationError) {
      console.error(betCreationError.message);
      showToast(betCreationError.message, "error");
    }
  }, [betCreationError]);

  useEffect(() => {
    if (isCreateBetTxSuccess) {
      showToast("Bet Created Successfully", "success");
    }
  }, [isCreateBetTxSuccess]);

  useEffect(() => {
    if (isCreateBetTxSuccess) {
      router.push(
        `/create-bet/success?id=${id}&betType=${createBetVariables?.args?.[1]}`,
      );
    }
  }, [isCreateBetTxSuccess]);

  return (
    <div
      className={twMerge(
        "flex justify-center flex-col items-center w-full ",
        className,
      )}
    >
      {isBetUp ? (
        <ButtonSuccess
          loader={true}
          isPending={isPending}
          isProcessing={isProcessing}
          size={"regular"}
          disabled={isActionDisabled}
          onClick={handleActionButtonClick}
          className="w-full rounded-xl font-bold uppercase"
        >
          {getActionButtonText()}
        </ButtonSuccess>
      ) : (
        <ButtonDanger
          type="button"
          loader={true}
          isPending={isPending}
          isProcessing={isProcessing}
          size={"regular"}
          disabled={isActionDisabled}
          onClick={handleActionButtonClick}
          className="w-full rounded-xl font-bold uppercase"
        >
          {getActionButtonText()}
        </ButtonDanger>
      )}
    </div>
  );
};

export default LiteBetButton;

"use client";

import React, { useEffect } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { BetType, Currency } from "@/app/lib/utils/bets/types";
import useAllowances from "@/app/hooks/useAllowances";
import {
  erc20Abi,
  maxUint256,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import useBalances from "@/app/hooks/useBalances";
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
import { DegenBetsAbi } from "../lib/utils/bets/DegenBetsAbi";
import { ButtonSuccess } from "./Button/ButtonSuccess";
import { ButtonDanger } from "./Button/ButtonDanger";

const CreateBetButton: React.FC<{
  betType: BetType;
  className?: string;
  isBetOneUp: boolean;
}> = ({ betType, className, isBetOneUp }) => {
  const router = useRouter();
  const {
    value,
    currency,
    duration,
    ticker,
    metric,
    direction,
    isProMode,
    customDuration,
    setBetType,
    strikePriceCreator,
    error: createBetError,
  } = useBetContext();

  setBetType(betType);

  const durationValue = isProMode
    ? customDuration.value
    : BigInt(duration.value);

  const { address } = useAccount();

  const { showToast } = useToast();

  const {
    writeContractAsync: sendApprovalTx,
    data: approvalHash,
    isPending: isApprovalButtonPending,
  } = useWriteContract();

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

  const {
    isSuccess: isApprovalSuccess,
    error: approvalError,
    isLoading: isApprovalProcessing,
  } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });

  const { userAllowances } = useAllowances(
    isApprovalSuccess || isCreateBetTxSuccess,
    address || zeroAddress,
  );

  const { userBalances } = useBalances(isCreateBetTxSuccess, address);

  const isEth = currency.label === Currency.ETH;
  const valueInWei = isEth ? parseEther(value) : parseUnits(value, 6);

  const id = createBetVariables?.args && createBetVariables.args[0];

  const isAllowanceEnough =
    userAllowances[currency.label as Currency] >= valueInWei;
  const isBalanceEnough =
    userBalances[currency.label as Currency] >= valueInWei;
  const isPending = isCreateBetButtonPending || isApprovalButtonPending;
  const isProcessing = isCreateBetProcessing || isApprovalProcessing;

  const isActionDisabled =
    !isBalanceEnough ||
    !address ||
    Number(value) <= 0 ||
    isPending ||
    isProcessing ||
    !!createBetError;

  const approve = async () => {
    try {
      await sendApprovalTx({
        abi: erc20Abi,
        address: currency.value,
        functionName: "approve",
        args: [DEGEN_BETS_ADDRESS, maxUint256],
      });
    } catch (error: any) {
      console.error("Approval Error: ", error);
      showToast(error.shortMessage, "error");
    }
  };

  const createBet = async () => {
    const ethValue = !isProMode
      ? parseEther(value)
      : isEth
        ? valueInWei
        : (undefined as any);
    const betDirection = isProMode ? direction.value : isBetOneUp;
    const randomId = uuid();

    const argument = isProMode
      ? [
          randomId,
          betType,
          durationValue,
          ticker.value,
          metric.value,
          strikePriceCreator,
          direction.value,
          valueInWei,
          currency.value,
        ]
      : ([
          randomId,
          "binary",
          BigInt(SIX_HOURS_BET_DURATION),
          "ETH",
          "price",
          strikePriceCreator,
          betDirection,
          parseEther(value),
          zeroAddress,
        ] as any);

    try {
      await sendCreateBetTx({
        abi: DegenBetsAbi,
        address: DEGEN_BETS_ADDRESS,
        functionName: "createBet",
        args: argument,
        value: ethValue,
        chainId: base.id,
      });
    } catch (error: any) {
      showToast(error.shortMessage, "error");
      console.error(error);
    }
  };

  const handleActionButtonClick = async () => {
    if (isProMode && !isAllowanceEnough) {
      await approve();
    }
    await createBet();
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
    if (!isAllowanceEnough && isProMode) {
      return `Approve ${currency.label}`;
    }

    return isProMode ? "Create Bet" : isBetOneUp ? "Bet Up" : "Bet Down";
  };

  useEffect(() => {
    if (!!betCreationError) {
      console.error(betCreationError.message);
      showToast(betCreationError.message, "error");
    }
    if (!!approvalError) {
      console.error(approvalError.message);
      showToast(approvalError.message, "error");
    }
  }, [approvalError, betCreationError]);

  useEffect(() => {
    if (isApprovalSuccess) {
      showToast("Approval Successful", "success");
    }
    if (isCreateBetTxSuccess) {
      showToast("Bet Created Successfully", "success");
    }
  }, [isApprovalSuccess, isCreateBetTxSuccess]);

  useEffect(() => {
    if (isCreateBetTxSuccess) {
      router.push(`/create-bet/success?id=${id}`);
    }
  }, [isCreateBetTxSuccess]);

  const ButtonComponent =
    isProMode || isBetOneUp ? ButtonSuccess : ButtonDanger;

  return (
    <div
      className={twMerge(
        "flex justify-center flex-col items-center w-full",
        className,
      )}
    >
      <ButtonComponent
        loader={true}
        isPending={isPending}
        isProcessing={isProcessing}
        size={"regular"}
        disabled={isActionDisabled}
        onClick={handleActionButtonClick}
        className={twMerge(
          isActionDisabled &&
            "bg-red-light hover:bg-red-main cursor-not-allowed active:bg-red-main",
          "rounded-xl font-bold uppercase",
        )}
      >
        {getActionButtonText()}
      </ButtonComponent>
    </div>
  );
};

export default CreateBetButton;

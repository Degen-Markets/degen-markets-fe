"use client";

import { ButtonGradient } from "@/app/components/Button";
import React, { useEffect } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { BetType, Currency, Metric, Ticker } from "@/app/lib/utils/bets/types";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import {
  erc20Abi,
  maxUint256,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
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
import { AnyNode } from "postcss";

const BetUpButton: React.FC<{ betType: BetType; className?: string }> = ({
  betType,
  className,
}) => {
  const router = useRouter();
  const {
    value,
    currency,
    ticker,
    metric,
    setCurrency,
    setCustomDuration,
    setTicker,
    setMetric,
    direction,
    customDuration,
    setBetType,
    strikePriceCreator,
    error: createBetError,
  } = useBetContext();

  useEffect(() => {
    setCustomDuration({
      label: "6 Hours",
      value: BigInt(SIX_HOURS_BET_DURATION),
    });
    setTicker({
      label: "ETH",
      value: Ticker.ETH,
    });
    setMetric({
      label: "Price",
      value: Metric.PRICE,
    });
    setCurrency({
      label: Currency.ETH,
      value: zeroAddress,
    });
  }, [setTicker, setCustomDuration, setMetric, setCurrency]);

  setBetType(betType);

  // const durationValue = isProMode
  //   ? customDuration.value
  //   : BigInt(duration.value);

  const durationValue = customDuration.value;

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

  const isEth = currency.label === Currency.ETH;
  const valueInWei = parseEther(value);

  const id = createBetVariables?.args && createBetVariables.args[0];

  const isBalanceEnough =
    userBalances[currency.label as Currency] >= valueInWei;

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
    const randomId = uuid();

    const value = valueInWei as any;
    console.log({
      randomId,
      betType,
      durationValue,
      TickerValue: ticker.value,
      MaticValue: metric.value,
      strikePriceCreator,
      Direction: direction.value,
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
          betType,
          durationValue,
          ticker.value,
          metric.value,
          strikePriceCreator,
          direction.value,
          valueInWei,
          currency.value,
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
    return "Bet Up";
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
      router.push(`/create-bet/success?id=${id}`);
    }
  }, [isCreateBetTxSuccess]);

  return (
    <div
      className={twMerge(
        "flex justify-center flex-col items-center w-full ",
        className,
      )}
    >
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
    </div>
  );
};

export default BetUpButton;

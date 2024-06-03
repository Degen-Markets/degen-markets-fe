"use client";

import { ButtonGradient } from "@/app/components/Button";
import React, { useEffect } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Currency } from "@/app/lib/utils/bets/types";
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
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

const ActionButton: React.FC<{}> = () => {
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
  } = useBetContext();

  const durationValue = isProMode
    ? BigInt(customDuration.value)
    : BigInt(duration.value);
  const { address } = useAccount();
  const { writeContract: sendApprovalTx, data: approvalHash } =
    useWriteContract();
  const {
    writeContract: sendCreateBetTx,
    data: createBetHash,
    variables: createBetVariables,
  } = useWriteContract();

  const { isSuccess: isCreateBetTxSuccess } = useTransactionReceipt({
    hash: createBetHash,
    chainId: base.id,
  });

  const { isSuccess: isApprovalSuccess } = useTransactionReceipt({
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
  const isActionDisabled = !isBalanceEnough || !address || Number(value) <= 0;

  const approve = () => {
    sendApprovalTx({
      abi: erc20Abi,
      address: currency.value,
      functionName: "approve",
      args: [DEGEN_BETS_ADDRESS, maxUint256],
    });
  };

  const createBet = async () => {
    const randomId = uuid();
    sendCreateBetTx({
      abi: DEGEN_BETS_ABI,
      address: DEGEN_BETS_ADDRESS,
      functionName: "createBet",
      args: [
        randomId,
        "binary",
        durationValue,
        ticker.value,
        metric.value,
        "",
        direction.value,
        valueInWei,
        currency.value,
      ],
      value: isEth ? valueInWei : undefined,
      chainId: base.id,
    });
  };

  const handleActionButtonClick = async () => {
    if (!isAllowanceEnough) {
      await approve();
      return;
    }
    await createBet();
  };

  const getActionButtonText = (): string => {
    if (!address) {
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return `Approve ${currency.label}`;
    }
    return "Create Bet";
  };

  useEffect(() => {
    if (isCreateBetTxSuccess) {
      router.push(`/create-bet/success?id=${id}`);
    }
  }, [isCreateBetTxSuccess]);

  return (
    <div className="flex justify-center">
      <ButtonGradient
        size={"regular"}
        disabled={isActionDisabled}
        onClick={handleActionButtonClick}
      >
        {getActionButtonText()}
      </ButtonGradient>
    </div>
  );
};

export default ActionButton;

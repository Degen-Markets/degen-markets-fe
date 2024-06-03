"use client";

import { ButtonGradient } from "@/app/components/Button";
import React, { useEffect } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Currency, Tx } from "@/app/lib/utils/bets/types";
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
import { useToast } from "@/app/components/Toast/ToastProvider";

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
  const isActionDisabled = !isBalanceEnough || !address || Number(value) <= 0;

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
    try {
      const randomId = uuid();
      await sendCreateBetTx({
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
    } catch (error: any) {
      showToast(error.shortMessage, "error");
      console.error(error);
    }
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

  const getTxState = (): Tx => {
    if (isCreateBetButtonPending || isApprovalButtonPending) {
      return Tx.Pending;
    }
    if (isCreateBetProcessing || isApprovalProcessing) {
      return Tx.Processing;
    }
    return Tx.Idle;
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

  return (
    <div className="flex justify-center">
      <ButtonGradient
        loader={true}
        txState={getTxState()}
        size={"regular"}
        disabled={
          isActionDisabled ||
          isCreateBetButtonPending ||
          isCreateBetProcessing ||
          isApprovalProcessing ||
          isApprovalButtonPending
        }
        onClick={handleActionButtonClick}
      >
        {getActionButtonText()}
      </ButtonGradient>
    </div>
  );
};

export default ActionButton;

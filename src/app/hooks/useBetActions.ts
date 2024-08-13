import { useCallback, useEffect, useMemo } from "react";
import { erc20Abi, maxUint256, zeroAddress } from "viem";
import { DegenBetsAbi } from "@/app/lib/utils/bets/DegenBetsAbi";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { useWriteContract, useTransactionReceipt, useAccount } from "wagmi";
import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { useBalanceContext } from "@/app/components/RecentActivity/BalanceContext";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { base } from "wagmi/chains";
import { Address } from "@/app/lib/utils/bets/types";
import useAllowances from "@/app/hooks/useAllowances";

interface UseBetActionsParams {
  betId: string;

  currency: Address;
  value: bigint;
  strikePriceAcceptor?: string;
}

const useBetActions = ({
  betId,
  currency,
  value,
  strikePriceAcceptor = "",
}: UseBetActionsParams) => {
  const { userBalances } = useBalanceContext();
  const { showToast } = useToast();
  const { address } = useAccount();
  const currencySymbol = getCurrencySymbolByAddress(currency);
  const isEth = currency === zeroAddress;
  const valueInWei = useMemo(() => BigInt(value), [value]);

  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;
  const {
    data: approvalHash,
    writeContractAsync: sendApprovalTx,
    isPending: isApprovalPending,
  } = useWriteContract();
  const {
    data: betAcceptHash,
    writeContractAsync: sendAcceptBetTx,
    isPending: isBetPending,
  } = useWriteContract();
  const {
    isSuccess: isApprovalSuccess,
    error: approvalError,
    isLoading: isApprovalProcessing,
  } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });
  const {
    isSuccess: isBetAcceptedSuccess,
    error: betAcceptanceError,
    isLoading: isBetProcessing,
  } = useTransactionReceipt({
    hash: betAcceptHash,
    chainId: base.id,
  });

  const { userAllowances } = useAllowances(
    isApprovalSuccess || isBetAcceptedSuccess,
    address || zeroAddress,
  );
  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;

  const isPending = isApprovalPending || isBetPending;
  const isProcessing = isApprovalProcessing || isBetProcessing;

  const approve = useCallback(async () => {
    try {
      await sendApprovalTx({
        abi: erc20Abi,
        address: currency,
        functionName: "approve",
        args: [DEGEN_BETS_ADDRESS, maxUint256],
      });
    } catch (error: any) {
      console.error({ error });
      showToast(error.shortMessage ?? error, "error");
    }
  }, [sendApprovalTx, currency, showToast]);

  const acceptBet = useCallback(async () => {
    try {
      await sendAcceptBetTx({
        abi: DegenBetsAbi,
        address: DEGEN_BETS_ADDRESS,
        functionName: "acceptBet",
        args: [betId, strikePriceAcceptor],
        value: isEth ? valueInWei : (undefined as any),
      });
    } catch (error: any) {
      console.error(error);
      showToast(error.shortMessage ?? error, "error");
    }
  }, [
    sendAcceptBetTx,
    betId,
    strikePriceAcceptor,
    isEth,
    valueInWei,
    showToast,
  ]);

  useEffect(() => {
    if (!!betAcceptanceError) {
      showToast(betAcceptanceError.message, "error");
    }
    if (!!approvalError) {
      showToast(approvalError.message, "error");
    }
  }, [approvalError, betAcceptanceError]);

  return {
    isBalanceEnough,
    isPending,
    isProcessing,
    approve,
    acceptBet,
    isBetAcceptedSuccess,
    isAllowanceEnough,
    currencySymbol,
  };
};

export default useBetActions;

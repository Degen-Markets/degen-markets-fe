import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { erc20Abi, maxUint256, zeroAddress } from "viem";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { ButtonGradient } from "@/app/components/Button";
import { base } from "wagmi/chains";
import { Address, BetResponse, Tx } from "@/app/lib/utils/bets/types";
import { useToast } from "./Toast/ToastProvider";
import { useTransactionReceipt, useWriteContract } from "wagmi";

interface AcceptBetButtonProps {
  bet: BetResponse;
  address: Address | undefined;
}

const AcceptBetButton = ({ bet, address }: AcceptBetButtonProps) => {
  const {
    data: approvalHash,
    writeContractAsync: sendApprovalTx,
    isIdle: isApprovalButtonIdle,
    isPending: isApprovalButtonPending,
  } = useWriteContract();
  const {
    data: betAcceptHash,
    writeContractAsync: sendAcceptBetTx,
    isIdle: isAcceptButtonIdle,
    isPending: isAcceptButtonPending,
  } = useWriteContract();
  const {
    isSuccess: isBetAcceptedSuccess,
    error: betAcceptanceError,
    isLoading: isApprovalProcessing,
  } = useTransactionReceipt({
    hash: betAcceptHash,
    chainId: base.id,
  });
  const {
    isSuccess: isApprovalSuccess,
    error: approvalError,
    isLoading: isAcceptanceProcessing,
  } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });
  const { showToast } = useToast();
  const { id, value, currency } = bet;
  const isEth = currency === zeroAddress;
  const valueInWei = BigInt(value);

  const router = useRouter();

  const { userAllowances } = useAllowances(
    isApprovalSuccess || isBetAcceptedSuccess,
    address || zeroAddress,
  );
  const currencySymbol = getCurrencySymbolByAddress(currency);
  const { userBalances } = useBalances(false, address);

  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;
  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;

  const acceptBet = async () => {
    try {
      await sendAcceptBetTx({
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "acceptBet",
        args: [id, ""],
        value: isEth ? valueInWei : undefined,
      });
    } catch (error: any) {
      console.error(error);
      showToast(error.shortMessage ?? error, "error");
    }
  };

  const approve = async () => {
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
  };

  const handleAccept = () => {
    if (!isAllowanceEnough) {
      approve();
    } else {
      acceptBet();
    }
  };

  useEffect(() => {
    if (!!betAcceptanceError) {
      showToast(betAcceptanceError.message, "error");
    }
    if (!!approvalError) {
      showToast(approvalError.message, "error");
    }
  }, [approvalError, betAcceptanceError]);

  useEffect(() => {
    if (isBetAcceptedSuccess) {
      router.push(`/bets/${id}/success`);
    }
  }, [isBetAcceptedSuccess, id, router]);

  const getActionButtonText = (): string => {
    if (!address) {
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return `Approve ${currencySymbol}`;
    }
    return "Accept Bet";
  };

  const getTxState = (): Tx => {
    if (isAcceptButtonPending || isApprovalButtonPending) {
      return Tx.Pending;
    }
    if (isAcceptanceProcessing || isApprovalProcessing) {
      return Tx.Processing;
    }
    return Tx.Idle;
  };

  return (
    <ButtonGradient
      loader={true}
      disabled={!isApprovalButtonIdle || !isAcceptButtonIdle}
      txState={getTxState()}
      size={"regular"}
      onClick={handleAccept}
    >
      {getActionButtonText()}
    </ButtonGradient>
  );
};

export default AcceptBetButton;

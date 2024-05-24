import { useEffect } from "react";
import { useTransactionReceipt, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import { erc20Abi, maxUint256, zeroAddress } from "viem";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { DEGEN_MARKETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { ButtonGradient } from "@/app/components/Button";
import { base } from "wagmi/chains";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";

interface AcceptBetButtonProps {
  bet: BetResponse;
  address: Address | undefined;
}

const AcceptBetButton = ({ bet, address }: AcceptBetButtonProps) => {
  const { id, value, currency } = bet;
  const isEth = currency === zeroAddress;
  const valueInWei = BigInt(value);

  const router = useRouter();
  const { data: approvalHash, writeContract: sendApprovalTx } =
    useWriteContract();
  const { data: betAcceptHash, writeContract: sendAcceptBetTx } =
    useWriteContract();

  const { isSuccess: isBetAcceptedHashSuccess } = useTransactionReceipt({
    hash: betAcceptHash,
    chainId: base.id,
  });
  const { isSuccess: isApprovalSuccess } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });

  const { userAllowances } = useAllowances(
    isApprovalSuccess || isBetAcceptedHashSuccess,
    address || zeroAddress,
  );
  const currencySymbol = getCurrencySymbolByAddress(currency);
  const { userBalances } = useBalances(false, address);

  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;
  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;

  const acceptBet = () => {
    sendAcceptBetTx({
      abi: DEGEN_MARKETS_ABI,
      address: DEGEN_MARKETS_ADDRESS,
      functionName: "acceptBet",
      args: [id],
      value: isEth ? valueInWei : undefined,
    });
  };

  const approve = () => {
    sendApprovalTx({
      abi: erc20Abi,
      address: currency,
      functionName: "approve",
      args: [DEGEN_MARKETS_ADDRESS, maxUint256],
    });
  };

  const handleAccept = () => {
    if (!isAllowanceEnough) {
      approve();
    } else {
      acceptBet();
    }
  };

  useEffect(() => {
    if (isApprovalSuccess) {
      acceptBet();
    }
  }, [isApprovalSuccess]);

  useEffect(() => {
    if (isBetAcceptedHashSuccess) {
      router.push(`/bets/${id}/success`);
    }
  }, [isBetAcceptedHashSuccess, id, router]);

  const getActionButtonText = (): string => {
    if (!address) {
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return "Approve and bet";
    }
    return "Accept Bet";
  };

  return (
    <ButtonGradient size={"regular"} onClick={handleAccept}>
      {getActionButtonText()}
    </ButtonGradient>
  );
};

export default AcceptBetButton;

"use client";
import { useState, useEffect } from "react";
import { ButtonGradient } from "@/app/components/Button";
import { useWriteContract, useTransactionReceipt, useAccount } from "wagmi";
import { calculateProfits } from "@/app/lib/utils/bets/helpers";
import {
  DEGEN_BETS_ADDRESS,
  SETTLE_CURRENCY,
  STABLECOIN_DECIMALS,
} from "@/app/lib/utils/bets/constants";
import { Address } from "viem";
import { useToast } from "../Toast/ToastProvider";
import { DegenBetsAbi } from "@/app/lib/utils/bets/DegenBetsAbi";
import { base } from "viem/chains";
import useGetBetForAddress from "@/app/lib/utils/hooks/useGetBetForAddress";

const RakeInProfitButton = () => {
  const { address } = useAccount();
  const [profits, setProfits] = useState({ usdc: 0, eth: 0 });
  const { unclaimedBets, fetchBetsByAddress } = useGetBetForAddress(
    address as Address,
  );
  const { showToast } = useToast();

  const {
    writeContractAsync: claimBetTx,
    isPending: isClaimButtonPending,
    data: claimedBetHash,
  } = useWriteContract();

  const {
    isSuccess: isClaimedSuccess,
    error: claimingError,
    isLoading: isClaimButtonProcessing,
  } = useTransactionReceipt({
    hash: claimedBetHash,
    chainId: base.id,
  });

  const profitButtonDisabled =
    unclaimedBets.length === 0 ||
    isClaimButtonPending ||
    isClaimButtonProcessing;

  const handleGetPaid = async () => {
    const unclaimedBetsId = unclaimedBets.map((bet) => bet.id);
    try {
      await claimBetTx({
        abi: DegenBetsAbi,
        address: DEGEN_BETS_ADDRESS,
        functionName: "getPaid",
        args: [unclaimedBetsId],
        chainId: base.id,
      });
    } catch (error: any) {
      console.error("Error processing claims:", error);
      showToast(error.shortMessage ?? error, "error");
    }
  };

  useEffect(() => {
    const usdcProfits = calculateProfits(
      unclaimedBets,
      SETTLE_CURRENCY.USDC,
      STABLECOIN_DECIMALS,
    );
    const ethProfits = calculateProfits(unclaimedBets, SETTLE_CURRENCY.ETH, 18);
    setProfits({ usdc: usdcProfits, eth: ethProfits });
  }, [unclaimedBets]);

  useEffect(() => {
    if (claimingError) {
      showToast(claimingError.message, "error");
    }
  }, [claimingError]);

  useEffect(() => {
    if (isClaimedSuccess) {
      showToast(
        `${unclaimedBets.length} ${unclaimedBets.length === 1 ? "Bet" : "Bets"} Claimed Successfully`,
        "success",
      );
      setTimeout(() => fetchBetsByAddress(address as Address), 500);
    }
  }, [isClaimedSuccess]);

  return (
    <div className="flex justify-center items-end flex-col">
      <ButtonGradient
        size="small"
        loader={true}
        onClick={handleGetPaid}
        isPending={isClaimButtonPending}
        isProcessing={isClaimButtonProcessing}
        disabled={profitButtonDisabled}
        className="text-sm"
      >
        Rake in Profits
      </ButtonGradient>
      <p className="text-yellow-main drop-shadow-sm mt-1 text-sm font-bold text-end">
        Unclaimed funds {profits.usdc} USDC and {profits.eth} ETH.
      </p>
    </div>
  );
};

export default RakeInProfitButton;

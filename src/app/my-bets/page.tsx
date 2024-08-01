"use client";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { useEffect } from "react";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";
import { ButtonGradient } from "../components/Button";
import { DEGEN_BETS_ADDRESS } from "../lib/utils/bets/constants";
import { useToast } from "../components/Toast/ToastProvider";
import { Address } from "viem";
import useGetBetForAddress from "@/app/hooks/useGetBetForAddress";
import { DegenBetsAbi } from "../lib/utils/bets/DegenBetsAbi";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const { bets, isLoading, unclaimedBets, fetchBetsByAddress } =
    useGetBetForAddress(address as Address);
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

  const buttonDisabled =
    unclaimedBets.length === 0 ||
    isClaimButtonPending ||
    isClaimButtonProcessing;

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

  if (!isConnected) {
    return (
      <div className="text-center text-xl md:text-2xl">
        Please connect to view your bets.
      </div>
    );
  }

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

  return (
    <Wrapper>
      {unclaimedBets.length >= 0 && (
        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <ButtonGradient
              loader={true}
              isPending={isClaimButtonPending}
              isProcessing={isClaimButtonProcessing}
              size="regular"
              onClick={handleGetPaid}
              disabled={buttonDisabled}
              className="flex justify-center items-center space-x-2"
            >
              Rake In Profits
            </ButtonGradient>
            <p className="text-yellow-main drop-shadow-sm mt-1">
              You have {unclaimedBets.length} unclaimed bet win(s)
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center text-xl md:text-2xl">Loading...</div>
      )}
      <BetsTab bets={bets} />
    </Wrapper>
  );
};

export default MyBets;

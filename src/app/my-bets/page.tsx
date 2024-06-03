"use client";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { useEffect, useState } from "react";
import { BetsResponse, Tx } from "@/app/lib/utils/bets/types";
import { getBetsForAddress } from "@/app/lib/utils/api/getBetsForAddress";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";
import { ButtonGradient } from "../components/Button";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import { DEGEN_BETS_ADDRESS } from "../lib/utils/bets/constants";
import { useToast } from "../components/Toast/ToastProvider";
import { Address } from "viem";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const [bets, setBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unclaimedBets, setUnclaimedBets] = useState<BetsResponse>([]);
  const { showToast } = useToast();
  const {
    writeContractAsync: claimBetTx,
    isIdle: isClaimButtonIdle,
    isPending: isClaimButtonPending,
    isSuccess: isClaimButtonProcessing,
    reset: resetClaim,
    data: claimedBetHash,
  } = useWriteContract();

  const { isSuccess: isClaimedSuccess, error: claimingError } =
    useTransactionReceipt({
      hash: claimedBetHash,
      chainId: base.id,
    });

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      const { data: bets } = await getBetsForAddress(address);
      const unclaimed = bets.filter(
        (bet) =>
          !bet.isPaid && bet.winner?.toLowerCase() === address.toLowerCase(),
      );
      setUnclaimedBets(unclaimed);
      setBets(bets);
    } catch (error) {
      console.error("Error fetching bets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchBetsByAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (claimingError) {
      showToast(claimingError.message, "error");
      resetClaim();
    }
  }, [claimingError]);

  useEffect(() => {
    if (isClaimedSuccess) {
      resetClaim();
      showToast(
        `${unclaimedBets.length} ${unclaimedBets.length === 1 ? "bet" : "bets"} claimed successfully`,
        "success",
      );
      fetchBetsByAddress(address as Address);
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
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "getPaid",
        args: [unclaimedBetsId],
        chainId: base.id,
      });
    } catch (error: any) {
      resetClaim();
      console.error("Error processing withdrawal:", error);
      showToast(error.shortMessage ?? error, "error");
    }
  };

  const getTxState = (): Tx => {
    if (isClaimButtonPending) {
      return Tx.Pending;
    }
    if (isClaimButtonProcessing) {
      return Tx.Processing;
    }
    return Tx.Idle;
  };

  return (
    <>
      <Wrapper>
        {unclaimedBets.length > 0 && (
          <div className="flex justify-end">
            <div className="flex flex-col items-end">
              <ButtonGradient
                loader={true}
                txState={getTxState()}
                size="regular"
                onClick={handleGetPaid}
                disabled={unclaimedBets.length === 0 || !isClaimButtonIdle}
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
    </>
  );
};

export default MyBets;

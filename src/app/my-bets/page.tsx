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
import { Address } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../providers";
import { writeContract } from "wagmi/actions";
import PixelArtLoader from "../components/PixelArtLoading";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const [bets, setBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [txClaim, setTxClaim] = useState<Tx>(Tx.Idle);
  const [unclaimedBets, setUnclaimedBets] = useState<BetsResponse>([]);

  const isClaimIdle = txClaim === Tx.Idle;
  const isClaimPending = txClaim === Tx.Pending;
  const isClaimProcessing = txClaim === Tx.Processing;

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
      setTxClaim(Tx.Pending);
      const getPaidHash = await writeContract(config, {
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "getPaid",
        args: [unclaimedBetsId],
        chainId: base.id,
      });
      setTxClaim(Tx.Processing);
      const { status } = await waitForTransactionReceipt(config, {
        hash: getPaidHash as Address,
      });
      if (status === "success") {
        fetchBetsByAddress(address as Address);
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
    } finally {
      setTxClaim(Tx.Idle);
    }
  };

  return (
    <>
      <Wrapper>
        {unclaimedBets.length > 0 && (
          <div className="flex justify-end">
            <div className="flex flex-col items-end">
              <ButtonGradient
                size="regular"
                onClick={handleGetPaid}
                disabled={unclaimedBets.length === 0 || !isClaimIdle}
                className="flex justify-center items-center space-x-2"
              >
                {isClaimIdle && `Rake In Profits`}
                {isClaimPending && (
                  <PixelArtLoader text="Pending..." textSize="2xl" />
                )}
                {isClaimProcessing && (
                  <PixelArtLoader text="Processing..." textSize="2xl" />
                )}
              </ButtonGradient>
              <p className="text-yellow-main drop-shadow-sm">
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

"use client";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBetsForAddress } from "@/app/lib/utils/api/getBetsForAddress";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";
import { ButtonGradient } from "../components/Button";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import { DEGEN_BETS_ADDRESS } from "../lib/utils/bets/constants";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const [bets, setBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unclaimedBets, setUnclaimedBets] = useState<BetsResponse>([]);

  const { writeContract: getPaid, data: getPaidHash } = useWriteContract();

  const { isSuccess: getPaidSuccess } = useTransactionReceipt({
    hash: getPaidHash,
  });

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      const { data: bets } = await getBetsForAddress(address);
      const unclaimed = bets.filter(
        (bet) => !bet.isPaid && bet.winner === address.toLowerCase(),
      );
      setUnclaimedBets(unclaimed);
      console.log({
        unclaimed,
        unclaimedBets,
        address,
      });
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
  }, [address, getPaidSuccess]);

  if (!isConnected) {
    return (
      <div className="text-center text-xl md:text-2xl">
        Please connect to view your bets.
      </div>
    );
  }

  const handleGetPaid = () => {
    const unclaimedBetsId = unclaimedBets.map((bet) => bet.id);
    try {
      getPaid({
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "getPaid",
        args: [unclaimedBetsId],
        chainId: base.id,
      });
    } catch (error) {
      console.error("Error processing withdrawal:", error);
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
                disabled={unclaimedBets.length === 0}
                className="flex justify-center items-center space-x-2"
              >
                Rake In Profits
              </ButtonGradient>
              <p className="text-[#F21212] drop-shadow-sm">
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

"use client";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBetsForAddress } from "@/app/lib/utils/api/getBetsForAddress";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";

const MyBets = () => {
  const { address, isConnected } = useAccount();
  const [bets, setBets] = useState<BetsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBetsByAddress = async (address: `0x${string}`) => {
    try {
      setIsLoading(true);
      const { data: bets } = await getBetsForAddress(address);
      console.log(bets);
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
  return (
    <Wrapper>
      {isLoading && (
        <div className="text-center text-xl md:text-2xl">Loading...</div>
      )}
      <BetsTab bets={bets} />
    </Wrapper>
  );
};

export default MyBets;

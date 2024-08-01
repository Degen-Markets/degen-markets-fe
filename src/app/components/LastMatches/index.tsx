"use client";
import { useMemo } from "react";
import { ButtonGradient } from "@/app/components/Button";
import { isBetConcluded } from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { useAccount } from "wagmi";
import BetTable from "./MatchesBetTable";
import { DialogType, useDialog } from "../Dialog/dialog";
import Image from "next/image";
import RakeInProfitButton from "../Button/RakeInProfitButton";
import useGetBetForAddress from "@/app/hooks/useGetBetForAddress";

const LastMatches = () => {
  const { address } = useAccount();
  const { bets, isLoading } = useGetBetForAddress(address as Address);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);

  const concludedbets = useMemo(() => bets.filter(isBetConcluded), [bets]);

  if (!address) {
    return (
      <div className="flex justify-center flex-col items-center h-[50vh] space-y-2">
        <h4 className="text-4xl">Please Connect Your Wallet</h4>
        <ButtonGradient size="regular" onClick={() => setOpenConnector(true)}>
          Wallet not connected
        </ButtonGradient>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-center">
      <div>
        <RakeInProfitButton />
        <div className="border-b border-gray-300 flex justify-start items-end mb-10">
          <div className="flex items-center space-x-2 font-bold uppercase">
            <Image
              src="/profile/Matches.svg"
              alt="Matches"
              width={30}
              height={30}
            />
            <span>Last Matches</span>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="font-bold uppercase">Loading...</div>
          ) : concludedbets.length > 0 ? (
            <BetTable bets={concludedbets} />
          ) : (
            <div className="font-bold uppercase">Not Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastMatches;

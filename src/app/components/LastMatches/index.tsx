"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@/app/components/Tabs/Tabs";
import { ButtonGradient } from "@/app/components/Button";
import {
  calculateProfits,
  isBetConcluded,
  isBetExpired,
  isBetRunning,
} from "@/app/lib/utils/bets/helpers";
import {
  DEGEN_BETS_ADDRESS,
  SETTLE_CURRENCY,
  STABLECOIN_DECIMALS,
} from "@/app/lib/utils/bets/constants";
import { Address } from "viem";
import { useAccount, useTransactionReceipt } from "wagmi";
import useGetBetForAddress from "@/app/lib/utils/hooks/useGetBetForAddress";
import BetTable from "./BetTable";
import { DialogType, useDialog } from "../Dialog/dialog";
import { useWriteContract } from "wagmi";
import { base } from "viem/chains";
import { useToast } from "../Toast/ToastProvider";
import { DegenBetsAbi } from "@/app/lib/utils/bets/DegenBetsAbi";
import Image from "next/image";

const LastMatches = () => {
  const { address } = useAccount();
  const [profits, setProfits] = useState({ usdc: 0, eth: 0 });
  const { bets, isLoading, unclaimedBets, fetchBetsByAddress } =
    useGetBetForAddress(address as Address);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);
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

  const categorizedBets = useMemo(
    () => ({
      running: bets.filter(isBetRunning),
      concluded: bets.filter(isBetConcluded),
      expired: bets.filter(isBetExpired),
    }),
    [bets],
  );

  const betCategories = [
    {
      label: (
        <div className="flex items-center space-x-2">
          <Image
            src="/profile/Matches.svg"
            alt="Matches"
            width={30}
            height={30}
          />
          <span>Last Matches</span>
        </div>
      ),
      className: "md:text-2xl uppercase font-bold",
      bets: categorizedBets.concluded,
    },
  ];

  const defaultActiveIndex = 0;

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
    <div className="max-w-7xl mx-auto lg:p-4 text-center">
      <div>
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
          <p className="text-yellow-main drop-shadow-sm mt-1 text-sm font-bold">
            Unclaimed funds {profits.usdc} USDC and {profits.eth} ETH.
          </p>
        </div>
        <Tabs defaultActiveIndex={defaultActiveIndex}>
          <TabList className="border-b border-gray-300 flex justify-start items-end">
            {betCategories.map((category, index) => (
              <Tab
                key={index}
                index={index}
                className={`${category.className}`}
              >
                {category.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="">
            {betCategories.map((category, index) => {
              const hasBetsInCategory = category.bets.length > 0;
              return (
                <TabPanel key={index} index={index}>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : hasBetsInCategory ? (
                    <BetTable bets={category.bets} />
                  ) : null}
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default LastMatches;

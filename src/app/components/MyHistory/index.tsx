"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@/app/components/Tabs/Tabs";
import { ButtonGradient, ButtonPrimary } from "@/app/components/Button";
import { useRouter } from "next/navigation";
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
import UserAvatar from "@/app/components/UserAvatar";
import useGetBetForAddress from "@/app/hooks/useGetBetForAddress";
import BetTable from "./BetTable";
import { DialogType, useDialog } from "../Dialog/dialog";
import { useWriteContract } from "wagmi";
import { base } from "viem/chains";
import { useToast } from "../Toast/ToastProvider";
import { DegenBetsAbi } from "@/app/lib/utils/bets/DegenBetsAbi";

const MyHistory = () => {
  const { address } = useAccount();
  const router = useRouter();
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
      label: "Existing Bets",
      className: "bg-indigo-medium md:text-2xl",
      bets: categorizedBets.running,
    },
    {
      label: "History",
      className: "bg-purple-medium md:text-2xl",
      bets: categorizedBets.concluded,
    },
    {
      label: "Expired Bets",
      className: "bg-red-main md:text-2xl",
      bets: categorizedBets.expired,
    },
  ];

  const defaultActiveIndex = categorizedBets.running.length ? 0 : 1;

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
    <div className="max-w-7xl mx-auto p-4 text-center">
      <div className="mb-8">
        <UserAvatar
          address={address}
          className="w-40 h-40 mx-auto rounded-full"
        />
        <h2 className="text-3xl font-semibold mt-4">@DEGEN</h2>
        <p className="text-prussian-dark">You</p>
      </div>
      <div>
        <div className="flex justify-center items-end flex-col">
          <ButtonGradient
            size="regular"
            loader={true}
            onClick={handleGetPaid}
            isPending={isClaimButtonPending}
            isProcessing={isClaimButtonProcessing}
            disabled={profitButtonDisabled}
          >
            Rake in Profits
          </ButtonGradient>
          <p className="text-yellow-main drop-shadow-sm mt-1">
            You have won {profits.usdc} USDC and {profits.eth} ETH.
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
                  ) : (
                    <div className="text-center flex">
                      <div className="flex flex-col items-center w-full space-y-2 p-8 ">
                        <p className="text-lg md:text-2xl text-prussian-dark">
                          There are no {category.label.toLowerCase()} right now.
                          Go make one!
                        </p>
                        <ButtonPrimary
                          size="small"
                          onClick={() => router.push("/create-bet")}
                        >
                          Create bet
                        </ButtonPrimary>
                      </div>
                    </div>
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default MyHistory;

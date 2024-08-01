"use client";
import { useMemo } from "react";
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
  isBetConcluded,
  isBetExpired,
  isBetRunning,
} from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { useAccount } from "wagmi";
import UserAvatar from "@/app/components/UserAvatar";
import useGetBetForAddress from "@/app/hooks/useGetBetForAddress";
import BetTable from "./BetTable";
import { DialogType, useDialog } from "../Dialog/dialog";
import RakeInProfitButton from "../Button/RakeInProfitButton";
import GradientText from "../WalletMenu/GradientText";

const MyHistory = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { bets, isLoading } = useGetBetForAddress(address as Address);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);

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
      className: "bg-indigo-medium font-bold",
      bets: categorizedBets.running,
    },
    {
      label: "History",
      className: "bg-purple-medium font-bold",
      bets: categorizedBets.concluded,
    },
    {
      label: "Expired Bets",
      className: "bg-red-main font-bold",
      bets: categorizedBets.expired,
    },
  ];

  const defaultActiveIndex = categorizedBets.running.length ? 0 : 1;

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
        <GradientText className="text-3xl font-semibold mt-4">
          @DEGEN
        </GradientText>
        <p>You</p>
      </div>
      <div>
        <div className="mb-3">
          <RakeInProfitButton />
        </div>
        <Tabs defaultActiveIndex={defaultActiveIndex}>
          <TabList className="border-b border-gray-300 flex justify-start items-end text-lg">
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
                        <p className="text-lg md:text-2xl ">
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

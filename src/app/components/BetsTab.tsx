"use client";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@/app/components/Tabs/Tabs";
import {
  isBetConcluded,
  isBetOpen,
  isBetRunning,
} from "@/app/lib/utils/bets/helpers";
import BetCard from "@/app/components/BetCard";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { ButtonPrimary } from "./Button";
import { useRouter } from "next/navigation";

interface Props {
  bets: BetsResponse;
}
const BetsTab = ({ bets }: Props) => {
  const router = useRouter();
  const categorizedBets = {
    open: bets.filter(isBetOpen),
    running: bets.filter(isBetRunning),
    concluded: bets.filter(isBetConcluded),
  };

  const betCategories = [
    {
      label: "Open bets",
      className: "bg-indigo-medium md:text-2xl",
      bets: categorizedBets.open,
    },
    {
      label: "Running bets",
      className: "bg-purple-medium md:text-2xl",
      bets: categorizedBets.running,
    },
    {
      label: "Closed bets",
      className: "bg-white text-prussian-dark md:text-2xl",
      bets: categorizedBets.concluded,
    },
  ];

  const defaultActiveIndex = categorizedBets.open.length
    ? 0
    : categorizedBets.running.length
      ? 1
      : 2;

  return (
    <Tabs defaultActiveIndex={defaultActiveIndex}>
      <TabList className="border-b border-white">
        {betCategories.map((category, index) => (
          <Tab key={index} index={index} className={category.className}>
            {category.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="">
        {betCategories.map((category, index) => {
          const hasBetsInCategory = category.bets.length > 0;
          return (
            <TabPanel
              key={index}
              index={index}
              className={`grid grid-cols-1 ${hasBetsInCategory ? "md:grid-cols-2" : ""} gap-x-4 gap-y-8`}
            >
              {hasBetsInCategory ? (
                category.bets.map((bet) => <BetCard key={bet.id} bet={bet} />)
              ) : (
                <div className="text-center flex">
                  <div className="flex flex-col items-center w-full space-y-2 p-8 ">
                    <p className="text-lg md:text-2xl text-prussian-dark">
                      There are no {category.label.toLowerCase()} right now. Go
                      make one!
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
  );
};

export default BetsTab;

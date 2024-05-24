import React from "react";
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

interface Props {
  bets: BetsResponse;
}
const BetsTab = ({ bets }: Props) => {
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
        {betCategories.map((category, index) => (
          <TabPanel
            key={index}
            index={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8"
          >
            {category.bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default BetsTab;

import React from "react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@/app/components/Tabs/Tabs";
import { getBets } from "@/app/lib/utils/api/getBets";
import {
  isBetConcluded,
  isBetOpen,
  isBetRunning,
} from "@/app/lib/utils/bets/helpers";
import BetCard from "@/app/components/BetCard";

const BetsTab = async () => {
  const { data: fetchedBets } = await getBets();

  const categorizedBets = {
    open: fetchedBets.filter(isBetOpen),
    running: fetchedBets.filter(isBetRunning),
    concluded: fetchedBets.filter(isBetConcluded),
  };

  const betCategories = [
    {
      label: "Open bets",
      className: "bg-indigo-medium text-2xl",
      bets: categorizedBets.open,
    },
    {
      label: "Running bets",
      className: "bg-purple-medium text-2xl",
      bets: categorizedBets.running,
    },
    {
      label: "Done bets",
      className: "bg-white text-prussian-dark text-2xl",
      bets: categorizedBets.concluded,
    },
  ];

  return (
    <Tabs>
      <TabList>
        {betCategories.map((category, index) => (
          <Tab key={index} index={index} className={category.className}>
            {category.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="h-screen overflow-y-scroll">
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

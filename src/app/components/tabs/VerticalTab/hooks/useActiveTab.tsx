import { useState } from "react";
import { Tab } from "../VerticalTabType";
export function useActiveTab(tabs: Tab[]) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return {
    activeTab,
    activeContent,
    setActiveTab,
  };
}

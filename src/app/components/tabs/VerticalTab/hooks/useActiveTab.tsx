"use client";
import { useState } from "react";
import { Tab } from "../FeatureTabsTypes";
export function useActiveTab(tabs: Tab[]) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab);
  return {
    activeTab,
    activeContent,
    setActiveTab,
  };
}

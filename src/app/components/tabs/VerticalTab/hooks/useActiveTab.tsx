"use client";
import { useState } from "react";
import { Tab } from "../SecondSectionType";
export function useActiveTab(tabs: Tab[]) {
  const [activeTab, setActiveTab] = useState(tabs[1].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return {
    activeTab,
    activeContent,
    setActiveTab,
  };
}

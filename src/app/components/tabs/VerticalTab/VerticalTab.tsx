"use client";
import React, { useState } from "react";
import { TabContent } from "../TabContent";
import { useActiveTab } from "./hooks/useActiveTab";
import { TabsVerticalProps } from "./VerticalTabType";
import { TabButton } from "../ButtonTab/TabButton";

export function TabsVertical({ tabs }: TabsVerticalProps) {
  const { activeTab, activeContent, setActiveTab } = useActiveTab(tabs);

  return (
    <div className="flex flex-1">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full p-8">
          <TabContent content={activeContent || ""} />
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-between">
        <div className="flex flex-col h-[500px]  w-52 justify-center items-center gap-5">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

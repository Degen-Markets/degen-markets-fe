"use client";
import React, { useState } from "react";
import { TabContent } from "../TabContent";
import { useActiveTab } from "./hooks/useActiveTab";
import { TabsVerticalProps } from "./VerticalTabType";
import { TabButton } from "../ButtonTab/TabButton";

export function TabsVertical({ tabs }: TabsVerticalProps) {
  const { activeTab, activeContent, setActiveTab } = useActiveTab(tabs);

  return (
    <div className="flex flex-1 flex-col-reverse md:flex-row">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full p-8">
          <TabContent content={activeContent || ""} />
        </div>
      </div>
      <div className="md:min-h-screen md:h-[1000px] mx-5 my-10 md:my-0 md:mx-0 flex items-center justify-between">
        <div className="flex md:flex-col flex-row  md:h-[600px] w-full md:w-20 justify-center items-center gap-5 my-10 md:my-0">
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

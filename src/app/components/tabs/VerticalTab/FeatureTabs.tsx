"use client";
import { TabContent } from "../TabContent";
import { useActiveTab } from "./hooks/useActiveTab";
import { TabButton } from "../ButtonTab/TabButton";
import { FeatureTabsProps } from "./FeatureTabsTypes";
import Wrapper from "@/app/components/Wrapper";
import { twMerge } from "tailwind-merge";

export function FeatureTabs({ tabs }: FeatureTabsProps) {
  const { activeTab, activeContent, setActiveTab } = useActiveTab(tabs);
  const isTokenomics = activeContent?.id === "tokenomics";

  return (
    <Wrapper>
      <div className="flex flex-1 flex-col-reverse md:flex-row">
        <div className="flex-1 flex items-center justify-center">
          <div
            className={twMerge(
              "w-full transform transition-transform",
              isTokenomics &&
                "md:p-8 sm:scale-[0.5] tablet:scale-[0.6] desktop:scale-[0.8] xl:scale-[0.9]",
            )}
          >
            <TabContent content={activeContent?.content || ""} />
          </div>
        </div>
        <div className="md:min-h-screen md:h-[1000px] mx-2 mt-10 md:my-0 md:mx-0 flex items-center justify-between">
          <div className="flex md:flex-col flex-row md:h-[600px] w-full md:w-20 justify-center items-center gap-5 my-10 md:my-0">
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
    </Wrapper>
  );
}

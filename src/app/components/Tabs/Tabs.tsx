"use client";
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  FC,
} from "react";

interface ITabsContext {
  activeIndex: number;
  selectTab: (index: number) => void;
}

const TabsContext = createContext<ITabsContext | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  defaultActiveIndex?: number;
}

export const Tabs: FC<TabsProps> = ({ children, defaultActiveIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const contextValue = useMemo(
    () => ({ activeIndex, selectTab }),
    [activeIndex, selectTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="flex flex-col h-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export const Tab: FC<{
  children: ReactNode;
  index: number;
  className?: string;
}> = ({ children, index, className }) => {
  const { activeIndex, selectTab } = useContext(TabsContext) as ITabsContext;
  if (activeIndex === undefined || selectTab === undefined)
    throw new Error("Tab components must be rendered within a Tabs component");

  const isActive = activeIndex === index;

  return (
    <button
      className={`px-4 pt-2 pb-2 ${className} ${isActive ? "pt-4" : ""}`}
      onClick={() => selectTab(index)}
    >
      {children}
    </button>
  );
};

export const TabPanels: FC<{ children: ReactNode; className: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`mt-2 md:mt-4 h-full pb-4 ${className}`}>{children}</div>
  );
};

export const TabPanel: FC<{
  children: ReactNode;
  index: number;
  className?: string;
}> = ({ className, children, index }) => {
  const { activeIndex } = useContext(TabsContext) as ITabsContext;
  if (activeIndex === undefined)
    throw new Error(
      "TabPanel components must be rendered within a Tabs component",
    );

  const isActive = activeIndex === index;

  return isActive ? (
    <div className={`mt-2 md:mt-4 h-full pb-4 ${className}`}>{children}</div>
  ) : null;
};

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

export const Tabs: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const contextValue = useMemo(
    () => ({ activeIndex, selectTab }),
    [activeIndex, selectTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="flex flex-col">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
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
      className={`px-4 pt-2 pb-2 ${className} ${isActive ? "active" : ""}`}
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
  return <div className={`mt-4 ${className}`}>{children}</div>;
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
    <div className={`mt-4 ${className}`}>{children}</div>
  ) : null;
};

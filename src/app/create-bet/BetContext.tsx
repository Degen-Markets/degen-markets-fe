"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Metric, ReelOption, Ticker } from "@/app/lib/utils/bets/types";
import { getRandomOption } from "@/app/lib/utils/bets/helpers";
import {
  currencyOptions,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";

interface BetContextProps {
  ticker: ReelOption<Ticker>;
  metric: ReelOption<Metric>;
  direction: ReelOption<boolean>;
  duration: ReelOption<number>;
  currency: ReelOption<`0x${string}`>;
  value: string;
  setTicker: Dispatch<SetStateAction<ReelOption<Ticker>>>;
  setMetric: Dispatch<SetStateAction<ReelOption<Metric>>>;
  setDirection: Dispatch<SetStateAction<ReelOption<boolean>>>;
  setDuration: Dispatch<SetStateAction<ReelOption<number>>>;
  setCurrency: Dispatch<SetStateAction<ReelOption<`0x${string}`>>>;
  setValue: Dispatch<SetStateAction<string>>;
  randomizeAllOptions: () => void;
}

const BetContext = createContext<BetContextProps | undefined>(undefined);

export const useBetContext = (): BetContextProps => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error("useBetContext must be used within a BetProvider");
  }
  return context;
};

export const BetProvider = ({ children }: { children: ReactNode }) => {
  const [ticker, setTicker] = useState(tickerOptions[0]);
  const [metric, setMetric] = useState(metricOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [currency, setCurrency] = useState<ReelOption<`0x${string}`>>(
    currencyOptions[0],
  );
  const [value, setValue] = useState("10");

  const randomizeAllOptions = () => {
    setTicker(getRandomOption(tickerOptions));
    setMetric(getRandomOption(metricOptions));
    setDirection(getRandomOption(directionOptions));
    setDuration(getRandomOption(durationOptions));
    setCurrency(getRandomOption(currencyOptions));
  };

  return (
    <BetContext.Provider
      value={{
        ticker,
        metric,
        direction,
        duration,
        currency,
        value,
        setTicker,
        setMetric,
        setDirection,
        setDuration,
        setCurrency,
        setValue,
        randomizeAllOptions,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

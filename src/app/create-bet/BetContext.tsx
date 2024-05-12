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

const defaultValues: BetContextProps = {
  ticker: tickerOptions[0],
  metric: metricOptions[0],
  direction: directionOptions[0],
  duration: durationOptions[0],
  currency: currencyOptions[0],
  value: "10",
  setTicker: () => {},
  setMetric: () => {},
  setDirection: () => {},
  setDuration: () => {},
  setCurrency: () => {},
  setValue: () => {},
  randomizeAllOptions: () => {},
};

const BetContext = createContext<BetContextProps>(defaultValues);

export const useBetContext = (): BetContextProps => useContext(BetContext);

export const BetProvider = ({ children }: { children: ReactNode }) => {
  const [ticker, setTicker] = useState(tickerOptions[0]);
  const [metric, setMetric] = useState(metricOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [currency, setCurrency] = useState<ReelOption<`0x${string}`>>(
    currencyOptions[0],
  );
  const [value, setValue] = useState<string>("10");

  const randomizeAllOptions = () => {
    setTicker(getRandomOption<Ticker>(tickerOptions));
    setMetric(getRandomOption<Metric>(metricOptions));
    setDirection(getRandomOption<boolean>(directionOptions));
    setDuration(getRandomOption<number>(durationOptions));
    setCurrency(getRandomOption<`0x${string}`>(currencyOptions));
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

"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import {
  BetType,
  Metric,
  ReelOption,
  Ticker,
} from "@/app/lib/utils/bets/types";
import { getRandomOption } from "@/app/lib/utils/bets/helpers";
import {
  currencyOptions,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";

interface BetContextProps {
  ticker: ReelOption<Ticker>;
  metric: ReelOption<Metric>;
  direction: ReelOption<boolean>;
  duration: ReelOption<number>;
  currency: ReelOption<Address>;
  value: string;
  customDuration: ReelOption<number>;
  isProMode: boolean;
  betType: BetType;
  strikePriceCreator: string;
  strikePriceAcceptor: string;
  setTicker: Dispatch<SetStateAction<ReelOption<Ticker>>>;
  setMetric: Dispatch<SetStateAction<ReelOption<Metric>>>;
  setDirection: Dispatch<SetStateAction<ReelOption<boolean>>>;
  setDuration: Dispatch<SetStateAction<ReelOption<number>>>;
  setCurrency: Dispatch<SetStateAction<ReelOption<Address>>>;
  setValue: Dispatch<SetStateAction<string>>;
  setBetType: Dispatch<SetStateAction<BetType>>;
  randomizeAllOptions: () => void;
  setCustomDuration: Dispatch<SetStateAction<ReelOption<number>>>;
  setIsProMode: Dispatch<SetStateAction<boolean>>;
  setStrikePriceCreator: Dispatch<SetStateAction<string>>;
  setStrikePriceAcceptor: Dispatch<SetStateAction<string>>;
}

const defaultValues: BetContextProps = {
  ticker: tickerOptions[0],
  metric: metricOptions[0],
  direction: directionOptions[0],
  duration: durationOptions[0],
  currency: currencyOptions[0],
  value: "10",
  customDuration: { label: "", value: 0 },
  isProMode: false,
  betType: "binary",
  strikePriceCreator: "",
  strikePriceAcceptor: "",
  setTicker: () => {},
  setMetric: () => {},
  setDirection: () => {},
  setDuration: () => {},
  setCurrency: () => {},
  setValue: () => {},
  setBetType: () => {},
  randomizeAllOptions: () => {},
  setCustomDuration: () => {},
  setIsProMode: () => {},
  setStrikePriceCreator: () => {},
  setStrikePriceAcceptor: () => {},
};

const BetContext = createContext<BetContextProps>(defaultValues);

export const useBetContext = (): BetContextProps => useContext(BetContext);
export const getDefaultOption = <T,>(
  options: ReelOption<T>[],
  value: T | null,
): ReelOption<T> =>
  options.find((option) => option.value === value) || options[0];

export const BetProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [isProMode, setIsProMode] = useState<boolean>(true);

  const defaultTicker = searchParams.get("ticker");
  const defaultMetric = searchParams.get("metric");
  const defaultDirection = searchParams.get("direction");
  const defaultDuration = searchParams.get("duration");
  const defaultCurrency = searchParams.get("currency");
  const defaultValue = searchParams.get("value");
  const defaultBetType = searchParams.get("betType");
  const defaultStrikePriceCreator = searchParams.get("strikePriceCreator");

  const [ticker, setTicker] = useState<ReelOption<Ticker>>(
    getDefaultOption(tickerOptions, defaultTicker as Ticker),
  );
  const [metric, setMetric] = useState<ReelOption<Metric>>(
    getDefaultOption(metricOptions, defaultMetric as Metric),
  );
  const [direction, setDirection] = useState<ReelOption<boolean>>(
    getDefaultOption(
      directionOptions,
      defaultDirection ? defaultDirection === "true" : true,
    ),
  );
  const [duration, setDuration] = useState<ReelOption<number>>(
    getDefaultOption(durationOptions, Number(defaultDuration)),
  );
  const [currency, setCurrency] = useState<ReelOption<Address>>(
    getDefaultOption(currencyOptions, defaultCurrency as Address),
  );
  const [value, setValue] = useState<string>(defaultValue || "10");
  const [betType, setBetType] = useState<BetType>(
    (defaultBetType || "binary") as BetType,
  );
  const [customDuration, setCustomDuration] = useState<ReelOption<number>>({
    label: "",
    value: 0,
  });

  const [strikePriceCreator, setStrikePriceCreator] = useState<string>(
    defaultStrikePriceCreator || "",
  );
  const [strikePriceAcceptor, setStrikePriceAcceptor] = useState<string>("");

  const randomizeAllOptions = () => {
    setTicker(getRandomOption<Ticker>(tickerOptions));
    setMetric(getRandomOption<Metric>(metricOptions));
    setDirection(getRandomOption<boolean>(directionOptions));
    setDuration(getRandomOption<number>(durationOptions));
    setCurrency(getRandomOption<Address>(currencyOptions));
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
        customDuration,
        isProMode,
        betType,
        strikePriceCreator,
        strikePriceAcceptor,
        setTicker,
        setMetric,
        setDirection,
        setDuration,
        setCurrency,
        setValue,
        setBetType,
        randomizeAllOptions,
        setCustomDuration,
        setIsProMode,
        setStrikePriceCreator,
        setStrikePriceAcceptor,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

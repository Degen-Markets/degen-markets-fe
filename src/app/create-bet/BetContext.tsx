"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useEffect,
  Suspense,
} from "react";

import {
  Metric,
  MetricOption,
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

interface BetContextProps {
  ticker: ReelOption<Ticker>;
  metric: ReelOption<Metric>;
  direction: ReelOption<boolean>;
  duration: ReelOption<number>;
  currency: ReelOption<`0x${string}`>;
  value: string;
  customDuration: ReelOption<number>;
  isProMode: boolean;
  setTicker: Dispatch<SetStateAction<ReelOption<Ticker>>>;
  setMetric: Dispatch<SetStateAction<ReelOption<Metric>>>;
  setDirection: Dispatch<SetStateAction<ReelOption<boolean>>>;
  setDuration: Dispatch<SetStateAction<ReelOption<number>>>;
  setCurrency: Dispatch<SetStateAction<ReelOption<`0x${string}`>>>;
  setValue: Dispatch<SetStateAction<string>>;
  randomizeAllOptions: () => void;
  setCustomDuration: Dispatch<SetStateAction<ReelOption<number>>>;
  setIsProMode: Dispatch<SetStateAction<boolean>>;
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
  setTicker: () => {},
  setMetric: () => {},
  setDirection: () => {},
  setDuration: () => {},
  setCurrency: () => {},
  setValue: () => {},
  randomizeAllOptions: () => {},
  setCustomDuration: () => {},
  setIsProMode: () => {},
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
  const [customDuration, setCustomDuration] = useState<ReelOption<number>>({
    label: "",
    value: 0,
  });
  const [isProMode, setIsProMode] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const defaultTicker = searchParams.get("ticker");
  const defaultMetric = searchParams.get("metric");
  const defaultDirection = searchParams.get("direction");
  const defaultDuration = searchParams.get("duration");
  const defaultCurrency = searchParams.get("currency");
  const defaultValue = searchParams.get("value");

  useEffect(() => {
    const defaultMetricOption: MetricOption | undefined = metricOptions.find(
      (option) => option.value === defaultMetric,
    );
    const defaultTickerOption = tickerOptions.find(
      (option) => option.value === defaultTicker,
    );
    const defaultDurationOption = durationOptions.find(
      (option) => option.value === Number(defaultDuration),
    );

    const defaultCurrencyOption = currencyOptions.find(
      (option) => option.value === defaultCurrency,
    );

    if (defaultTickerOption) setTicker(defaultTickerOption);
    if (defaultMetricOption) setMetric(defaultMetricOption);
    if (defaultDirection) setDirection(direction);
    if (defaultDurationOption) setDuration(defaultDurationOption);
    if (defaultCurrencyOption) setCurrency(defaultCurrencyOption);
    if (defaultValue) setValue(defaultValue);
  }, [
    defaultTicker,
    defaultMetric,
    defaultDirection,
    defaultDuration,
    defaultCurrency,
    defaultValue,
  ]);

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
        customDuration,
        isProMode,
        setTicker,
        setMetric,
        setDirection,
        setDuration,
        setCurrency,
        setValue,
        randomizeAllOptions,
        setCustomDuration,
        setIsProMode,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

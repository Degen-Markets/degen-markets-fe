"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  PRICE_IS_RIGHT_ROUTE,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { Address } from "viem";

interface BetContextProps {
  ticker: ReelOption<Ticker>;
  metric: ReelOption<Metric>;
  direction: ReelOption<boolean>;
  duration: ReelOption<number>;
  currency: ReelOption<Address>;
  value: string;
  customDuration: ReelOption<bigint>;
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
  setCustomDuration: Dispatch<SetStateAction<ReelOption<bigint>>>;
  setIsProMode: Dispatch<SetStateAction<boolean>>;
  setStrikePriceCreator: Dispatch<SetStateAction<string>>;
  setStrikePriceAcceptor: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;

  validateFields: () => void;
  prettySearch: boolean;
  setPrettySearch: Dispatch<SetStateAction<boolean>>;
}

const defaultValues: BetContextProps = {
  ticker: tickerOptions[0],
  metric: metricOptions[0],
  direction: directionOptions[0],
  duration: durationOptions[0],
  currency: currencyOptions[0],
  value: "10",
  customDuration: { label: "", value: 0n },
  isProMode: true,
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
  error: "",
  setError: () => {},
  validateFields: () => {},
  prettySearch: false,
  setPrettySearch: () => {},
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
  const [error, setError] = useState<string>("");

  const pathname = usePathname();

  const isPriceIsRightRoute = useMemo(
    () => pathname === PRICE_IS_RIGHT_ROUTE,
    [pathname],
  );

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
  const [customDuration, setCustomDuration] = useState<ReelOption<bigint>>({
    label: "",
    value: 0n,
  });

  const [strikePriceCreator, setStrikePriceCreator] = useState<string>(
    defaultStrikePriceCreator || "",
  );
  const [strikePriceAcceptor, setStrikePriceAcceptor] = useState<string>("");
  const [prettySearch, setPrettySearch] = useState<boolean>(false);

  const validateFields = useCallback(() => {
    if (isProMode && (!customDuration.value || customDuration.value <= 0n)) {
      setError("Please enter a valid time.");
      return false;
    }

    if (isPriceIsRightRoute && !strikePriceCreator) {
      setError("Please enter a valid guess price.");
      return false;
    }
    setError("");
    return true;
  }, [
    isProMode,
    customDuration.value,
    isPriceIsRightRoute,
    strikePriceCreator,
  ]);

  useEffect(() => {
    validateFields();
  }, [
    customDuration.value,
    strikePriceCreator,
    strikePriceAcceptor,
    validateFields,
  ]);

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
        error,
        setError,
        validateFields,
        prettySearch,
        setPrettySearch,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

import { zeroAddress } from "viem";
import {
  Currency,
  Metric,
  MetricOptions,
  ReelOption,
  Ticker,
} from "@/app/lib/utils/bets/types";

export const metricOptions: MetricOptions = [
  {
    label: "Price",
    value: Metric.PRICE,
  },
  {
    label: "Mkt Cap Dom",
    value: Metric.MARKET_CAP_DOMINANCE,
  },
  {
    label: "Volume",
    value: Metric.VOLUME,
  },
];

export const tickerOptions = Object.keys(Ticker).map((ticker) => ({
  label: ticker,
  value: ticker,
}));

export const SETTLE_CURRENCY: {
  ETH: `0x${string}`;
  USDC: `0x${string}`;
  USDbC: `0x${string}`;
} = {
  ETH: zeroAddress,
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  USDbC: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
};

export const currencyOptions: ReelOption<`0x${string}`>[] = Object.entries(
  SETTLE_CURRENCY,
).map(([key, value]) => ({
  label: Currency[key as keyof typeof Currency],
  value,
}));

const dayInSeconds = 60 * 60 * 24;

export const durationOptions = [
  {
    label: "1 Day",
    value: dayInSeconds,
  },
  ...[2, 3, 4, 5].map((dayNumber) => ({
    label: `${dayNumber} Days`,
    value: dayNumber * dayInSeconds,
  })),
];

export const directionOptions = [
  {
    label: "Up",
    value: true,
  },
  {
    label: "Down",
    value: false,
  },
];

export const DEGEN_MARKETS_ADDRESS =
  "0xA7Ee25d7Ae43A0db9c01fbeF389EcaF83Ba97A86";

export const DEFAULT_BET_DURATION = 14400;

export const STABLECOIN_DECIMALS = 6;

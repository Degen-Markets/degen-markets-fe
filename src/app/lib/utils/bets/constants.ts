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
    label: "Market Cap Dominance",
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

export const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const USDbC_ADDRESS = "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca";

export const currencyOptions: ReelOption<`0x${string}`>[] = [
  {
    label: Currency.ETH,
    value: zeroAddress,
  },
  {
    label: Currency.USDC,
    value: USDC_ADDRESS,
  },
  {
    label: Currency.USDbC,
    value: USDbC_ADDRESS,
  },
];

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

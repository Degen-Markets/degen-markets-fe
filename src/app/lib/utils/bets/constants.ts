import { zeroAddress } from "viem";
import { Metric, MetricOptions, Ticker } from "@/app/lib/utils/bets/types";
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

export const currencyOptions = [
  {
    label: "ETH",
    value: zeroAddress,
  },
  {
    label: "USDC",
    value: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  {
    label: "USDbC",
    value: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
  },
];

export const dayOptions = [
  {
    label: "1 Day",
    value: 1,
  },
  ...[2, 3, 4, 5].map((dayNumber) => ({
    label: `${dayNumber} Days`,
    value: dayNumber,
  })),
];

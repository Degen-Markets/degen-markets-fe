import { zeroAddress } from "viem";
import { Metric, MetricOptions, Ticker } from "@/app/lib/utils/bets/types";
export const metricOptions: MetricOptions = [
  {
    key: "Price",
    value: Metric.PRICE,
  },
  {
    key: "Market Cap Dominance",
    value: Metric.MARKET_CAP_DOMINANCE,
  },
  {
    key: "Volume",
    value: Metric.VOLUME,
  },
];

export const tickerOptions = Object.keys(Ticker).map((ticker) => ({
  key: ticker,
  value: ticker,
}));

export const currencyOptions = [
  {
    key: "ETH",
    value: zeroAddress,
  },
  {
    key: "USDC",
    value: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  {
    key: "USDbC",
    value: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
  },
];

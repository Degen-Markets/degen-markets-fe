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
    image: "/pixelated/money-bag.png",
  },
  {
    label: "Mkt Cap Dom",
    value: Metric.MARKET_CAP_DOMINANCE,
    image: "/MarketCap.svg",
  },
  {
    label: "24h Volume",
    value: Metric.VOLUME,
    image: "/Volume.svg",
  },
];

export const tickerOptions = Object.keys(Ticker).map((ticker) => ({
  label: ticker,
  value: ticker as Ticker,
  image: `/tokens/${ticker}.svg`,
}));

export const SETTLE_CURRENCY: { [key in Currency]: `0x${string}` } = {
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  ETH: zeroAddress, // Make sure this is correctly defined.
  USDbC: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
};

export const currencyOptions: ReelOption<`0x${string}`>[] = Object.entries(
  SETTLE_CURRENCY,
).map(([key, value]) => ({
  label: Currency[key as keyof typeof Currency],
  value,
  image: `/tokens/${Currency[key as keyof typeof Currency]}.svg`,
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
    image: "/ArrowUp.svg",
  },
  {
    label: "Down",
    value: false,
    image: "/ArrowDown.svg",
  },
];

export const DEGEN_BETS_ADDRESS = "0xf6927810102d37be74f585168064feece9a672c7";

export const BET_ACCEPTANCE_TIME_LIMIT = 60 * 60 * 4;

export const STABLECOIN_DECIMALS = 6;

export const MINIMUM_BET_DURATION = 60 * 60 * 6;
export const SIX_HOURS_BET_DURATION = 60 * 60 * 6;

export const PRICE_IS_RIGHT_ROUTE = "/games/price-is-right/create-bet";

// Regular expression to match a UUID

export const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const tickerToCmcId = {
  BTC: 1,
  DOGE: 74,
  ETH: 1027,
  SOL: 5426,
  UNI: 7083,
  AAVE: 7278,
  FLOKI: 10804,
  ARB: 11841,
  RON: 14101,
  APE: 18876,
  BANANA: 18998,
  LINK: 1975,
  BONK: 23095,
  BLUR: 23121,
  PEPE: 24478,
  dYdX: 28324,
  MEME: 28301,
  WIF: 28752,
  JUP: 29210,
  // BODEN: 29687,
  MFER: 30226,
  PAC: 30662,
};

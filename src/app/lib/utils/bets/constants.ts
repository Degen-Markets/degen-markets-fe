export const zeroAddress =
  "0x0000000000000000000000000000000000000000" as const;

export type Address = `0x${string}`;
import {
  BetsResponse,
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

export const DUMMY_BETS: BetsResponse = [
  {
    id: "1",
    creator: "0x1234567890abcdef1234567890abcdef12345678" as Address,
    creationTimestamp: "1693718400",
    acceptor: "0xabcdef1234567890abcdef1234567890abcdef12" as Address,
    acceptanceTimestamp: "1693804800",
    ticker: Ticker.BTC,
    metric: Metric.PRICE,
    isBetOnUp: true,
    value: "100",
    currency: "0x0000000000000000000000000000000000000000" as Address,
    startingMetricValue: 30000,
    endingMetricValue: 31000,
    winner: "0x1234567890abcdef1234567890abcdef12345678" as Address,
    isWithdrawn: true,
    withdrawalTimestamp: "1693891200",
    winTimestamp: "1693891200",
    lastActivityTimestamp: "1693891200",
    expirationTimestamp: "1693891200",
    isPaid: true,
    type: "binary",
    strikePriceCreator: "30000",
    strikePriceAcceptor: "31000",
  },
  {
    id: "2",
    creator: "0xabcdef1234567890abcdef1234567890abcdef12" as Address,
    creationTimestamp: "1693718500",
    acceptor: "0x1234567890abcdef1234567890abcdef12345678" as Address,
    acceptanceTimestamp: "1693804900",
    ticker: Ticker.ETH,
    metric: Metric.VOLUME,
    isBetOnUp: false,
    value: "200",
    currency: "0x0000000000000000000000000000000000000000" as Address,
    startingMetricValue: 500000,
    endingMetricValue: 480000,
    winner: "0xabcdef1234567890abcdef1234567890abcdef12" as Address,
    isWithdrawn: false,
    withdrawalTimestamp: "",
    winTimestamp: "1693900000",
    lastActivityTimestamp: "1693900000",
    expirationTimestamp: "1693900000",
    isPaid: true,
    type: "closest-guess-wins",
    strikePriceCreator: "500000",
    strikePriceAcceptor: "480000",
  },
];

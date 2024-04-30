export enum Ticker {
  BTC = "BTC",
  DOGE = "DOGE",
  ETH = "ETH",
  SOL = "SOL",
  FLOKI = "FLOKI",
  PEPE = "PEPE",
  WIF = "WIF",
  ARB = "ARB",
}

export enum Currency {
  ETH = "ETH",
  USDC = "USDC",
  USDbC = "USDbC",
}

export enum Metric {
  PRICE = "price",
  VOLUME = "volume",
  MARKET_CAP_DOMINANCE = "market_cap_dominance",
}

export type MetricOption = {
  label: string;
  value: Metric;
};

export type MetricOptions = MetricOption[];

export type ReelOption<T> = {
  label: string;
  value: T;
};

export type CreatedBetObject = {
  id: string;
  creator: `0x${string}`;
  creationTimestamp: string;
  duration: string;
  ticker: Ticker;
  metric: Metric;
  isBetOnUp: boolean;
  value: string;
  currency: `0x${string}`;
};

export type BetResponse = {
  id: string;
  creator: string;
  creationTimestamp: string;
  acceptor: string | null;
  ticker: Ticker;
  metric: Metric;
  isBetOnUp: boolean;
  expirationTimestamp: string;
  value: string;
  currency: string;
  startingMetricValue: number | null;
  endingMetricValue: number | null;
  winner: string | null;
  isWithdrawn: boolean;
  withdrawalTimestamp: string;
  lastActivityTimestamp: string;
};

export type BetsResponse = BetResponse[];

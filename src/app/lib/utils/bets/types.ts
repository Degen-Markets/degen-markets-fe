export enum Ticker {
  BTC = "BTC",
  DOGE = "DOGE",
  ETH = "ETH",
  SOL = "SOL",
  UNI = "UNI",
  AAVE = "AAVE",
  FLOKI = "FLOKI",
  ARB = "ARB",
  RON = "RON",
  APE = "APE",
  BANANA = "BANANA",
  LINK = "LINK",
  BONK = "BONK",
  BLUR = "BLUR",
  PEPE = "PEPE",
  dYdX = "dYdX",
  MEME = "MEME",
  WIF = "WIF",
  JUP = "JUP",
  BODEN = "BODEN",
  MFER = "MFER",
  PAC = "PAC",
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
  expirationTimestamp: string;
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

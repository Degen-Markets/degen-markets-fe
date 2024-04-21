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

export type MetricOptions = {
  key: string;
  value: Metric;
}[];

export type ReelOption<T> = {
  key: string;
  value: T;
};

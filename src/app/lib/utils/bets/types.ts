import { Hash } from "viem";

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
  VOLUME = "volume_24h",
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

export type Address = Hash;

export type CreatedBetObject = {
  id: string;
  creator: Address;
  creationTimestamp: string;
  expirationTimestamp: string;
  ticker: Ticker;
  metric: Metric;
  isBetOnUp: boolean;
  value: string;
  currency: Address;
};

export type BetResponse = {
  id: string;
  creator: Address;
  creationTimestamp: string;
  acceptor: Address | null;
  ticker: Ticker;
  metric: Metric;
  isBetOnUp: boolean;
  expirationTimestamp: string;
  value: string;
  currency: Address;
  startingMetricValue: number | null;
  endingMetricValue: number | null;
  winner: Address | null;
  isWithdrawn: boolean;
  withdrawalTimestamp: string;
  lastActivityTimestamp: string;
  isPaid: boolean;
};

export type BetsResponse = BetResponse[];

export type TextSize =
  | "sm"
  | "md"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export interface PixelArtLoaderProps {
  size?: number;
  pixelSize?: number;
  gap?: number;
  text: string;
  textSize: TextSize;
}

export type TopToken = {
  ticker: string;
  betCount: string;
};
// BTC
// DOGE
// ETH
// SOL
// UNI
// AAVE
// FLOKI
// ARB
// RON // 2 token found
// APE
// BANANA // not found
// LINK
// BONK
// BLUR
// PEPE
// dYdX // not found
// MEME // not found
// WIF
// JUP
// BODEN // not found
// MFER // not found
// PAC // not found

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
  acceptanceTimestamp: string | null;
  ticker: Ticker;
  metric: Metric;
  isBetOnUp: boolean;
  value: string;
  currency: Address;
  startingMetricValue: number | null;
  endingMetricValue: number | null;
  winner: Address | null;
  isWithdrawn: boolean;
  withdrawalTimestamp: string;
  winTimestamp: string | null;
  lastActivityTimestamp: string;
  expirationTimestamp: string;
  isPaid: boolean;
  type: BetType;
  strikePriceCreator: string | null;
  strikePriceAcceptor: string | null;
};

export type BetsResponse = BetResponse[];

export interface PixelArtLoaderProps {
  size?: number;
  pixelSize?: number;
  gap?: number;

  loaderColor?: string;

  textColor?: string;
  text: string;
  textSize?: string;
}

export type TopToken = {
  ticker: string;
  betCount: string;
};

export interface IWalletMenuItem {
  title: string;
  link: string;
  fn: () => void;
}

export interface DropdownProps {
  heading: React.ReactNode;
  menu: IWalletMenuItem[];
  account: string;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export type BetType = "binary" | "closest-guess-wins";

import { Dispatch, SetStateAction } from "react";
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
  image?: string;
};

export type MetricOptions = MetricOption[];

export type ReelOption<T> = {
  label: string;
  value: T;
  image?: string;
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

export interface BetComponentProps {
  ethPrice: number | null;
  tickerCmcResponse: TickerCmcApiData | null;
}

export interface PrettySearchProps<T> {
  data: T;
  setTicker: Dispatch<SetStateAction<ReelOption<Ticker>>>;
  setIsPrettySearchOpen: Dispatch<SetStateAction<boolean>>;
  rank?: number;
}

//  bet top tokens query data type

export interface Tag {
  slug: string;
  name: string;
  category: string;
}

export interface Quote {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string;
}
export interface TickerCmcApiData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: Tag[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  is_active: number;
  infinite_supply: boolean;
  platform: null;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  tvl_ratio: null;
  last_updated: string;
  quote: Quote;
}

export interface Status {
  timestamp: Date;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice: null;
}

export interface TickerCmcApiResponse {
  status: Status;
  data: TickerCmcApiData;
}

export type MetricSort =
  | Metric.PRICE
  | Metric.VOLUME
  | Metric.MARKET_CAP_DOMINANCE;

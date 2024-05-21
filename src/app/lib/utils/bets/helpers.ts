import {
  BET_ACCEPTANCE_TIME_LIMIT,
  metricOptions,
  SETTLE_CURRENCY,
} from "@/app/lib/utils/bets/constants";
import { BetResponse, Currency, Metric } from "@/app/lib/utils/bets/types";

export const betDurationInDays = (expirationTimestamp: number): string => {
  const days = Math.round(
    (expirationTimestamp * 1000 - Date.now()) / (24 * 60 * 60 * 1000),
  );
  return days > 1 ? `${days} days` : `${days} day`;
};

export const getCurrencySymbolByAddress = (address: string): Currency => {
  for (const [key, value] of Object.entries(SETTLE_CURRENCY)) {
    if (value.toLowerCase() === address.toLowerCase()) {
      return key as Currency;
    }
  }
  return Currency.ETH;
};

export const getHumanFriendlyMetric = (metric: Metric): string =>
  metricOptions.find((option) => option.value === metric)?.label || "price";

export const shortenHash = (hash: string, shortenBy?: number): string => {
  const shortenedString =
    hash.substring(0, shortenBy ?? 4) +
    "..." +
    hash.substring(hash.length - (shortenBy ?? 4));
  return shortenedString;
};

export const betDuration = (
  creationTimestamp: string,
  expirationTimestamp: string,
): string => {
  const creationDate = new Date(Number(creationTimestamp) * 1000);
  const expirationDate = new Date(Number(expirationTimestamp) * 1000);

  if (isNaN(creationDate.getTime()) || isNaN(expirationDate.getTime())) {
    return "Invalid date format";
  }

  const differenceInMillis = expirationDate.getTime() - creationDate.getTime();

  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24),
  );

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"}`;
};

export const checkLastActivity = (
  lastActivityTimestamp: string,
  creationTimestamp: string,
  acceptanceTimestamp: string,
  acceptor: string | null,
) => {
  if (lastActivityTimestamp === creationTimestamp) {
    return "created";
  } else if (
    lastActivityTimestamp === acceptanceTimestamp &&
    acceptor !== null
  ) {
    return "accepted";
  } else {
    return "";
  }
};

export const getBetDeadline = (bet: BetResponse): number =>
  Number(bet.creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT;

export const isTimestampInFuture = (timestampInSeconds: number): boolean =>
  timestampInSeconds > Date.now() / 1000;

export const isBetOpen = (bet: BetResponse): boolean =>
  isTimestampInFuture(getBetDeadline(bet));

export const isBetRunning = (bet: BetResponse): boolean =>
  bet.acceptor !== null && bet.winner === null;

export const isBetConcluded = (bet: BetResponse): boolean =>
  bet.winner !== null;

export const isBetWithdrawable = (bet: BetResponse): boolean =>
  !bet.isWithdrawn && bet.acceptor === null;

export const getRandomOption = <T>(
  options: { label: string; value: T }[],
): {
  label: string;
  value: T;
} => options[Math.floor(Math.random() * options.length)];

export const getLastLetter = (str: string): string => str.slice(str.length - 1);

export const getDisplayNameForAddress = (address: string): string =>
  address.slice(0, 4) + "..." + address.slice(-5);

export function getTimeDifferenceInSeconds(
  customDateTimeString: string,
): number {
  const currentTime = Math.floor(Date.now() / 1000);
  const customDateTime = new Date(customDateTimeString);
  const customUnixTimestamp = Math.floor(customDateTime.getTime() / 1000);
  const timeDifferenceInSeconds = customUnixTimestamp - currentTime;
  return timeDifferenceInSeconds;
}

// Getting the current date and time in the format to Disable the past date
export const getCurrentDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

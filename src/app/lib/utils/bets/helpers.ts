import {
  BET_ACCEPTANCE_TIME_LIMIT,
  metricOptions,
  SETTLE_CURRENCY,
  STABLECOIN_DECIMALS,
} from "@/app/lib/utils/bets/constants";
import {
  BetResponse,
  BetType,
  Currency,
  Metric,
} from "@/app/lib/utils/bets/types";
import { Address, formatUnits, Hash, zeroAddress } from "viem";

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

export const shortenHash = (hash: string, shortenBy?: number): string =>
  `${hash.substring(0, shortenBy ?? 4)}...${hash.substring(hash.length - (shortenBy ?? 4))}`;

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
  const differenceInSeconds = Math.ceil(differenceInMillis / 1000);
  const differenceInMinutes = Math.round(differenceInSeconds / 60);
  const differenceInHours = Math.round(differenceInMinutes / 60);

  if (differenceInSeconds < 1) {
    return "< 1 second";
  }

  if (differenceInMinutes < 1) {
    return `${differenceInSeconds} ${differenceInSeconds === 1 ? "second" : "seconds"}`;
  }

  if (differenceInHours < 1) {
    return `${differenceInMinutes} ${differenceInMinutes === 1 ? "minute" : "minutes"}`;
  }

  const differenceInDays = Math.round(differenceInHours / 24);

  if (differenceInDays < 1) {
    return `${differenceInHours} ${differenceInHours === 1 ? "hour" : "hours"}`;
  }

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"}`;
};

export const getLastActivity = (
  bet: BetResponse,
): { activity: string; actor: string } => {
  if (bet.lastActivityTimestamp === bet.creationTimestamp) {
    return {
      activity: "created",
      actor: bet.creator,
    };
  }
  if (
    bet.lastActivityTimestamp === bet.acceptanceTimestamp &&
    bet.acceptor !== null
  ) {
    return {
      activity: "accepted",
      actor: bet.acceptor,
    };
  }
  if (bet.lastActivityTimestamp === bet.winTimestamp && bet.winner !== null) {
    return {
      activity: "won",
      actor: bet.winner,
    };
  }
  if (bet.lastActivityTimestamp === bet.withdrawalTimestamp) {
    return {
      activity: "withdrew",
      actor: bet.creator,
    };
  }
  if (bet.lastActivityTimestamp === bet.expirationTimestamp) {
    return {
      activity: "expired",
      actor: bet.creator,
    };
  }
  return {
    activity: "",
    actor: "",
  };
};

export const getBetDeadline = (bet: BetResponse): number =>
  Number(bet.creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT;

export const isTimestampInFuture = (timestampInSeconds: number): boolean =>
  timestampInSeconds > Date.now() / 1000;

export const isBetOpen = (bet: BetResponse): boolean =>
  isTimestampInFuture(getBetDeadline(bet)) &&
  bet.acceptor == null &&
  isTimestampInFuture(Number(bet.expirationTimestamp)) &&
  !bet.isWithdrawn;

export const isBetRunning = (bet: BetResponse): boolean =>
  bet.acceptor !== null && bet.winner === null;

export const isBetConcluded = (bet: BetResponse): boolean =>
  bet.winner !== null;

export const getRandomOption = <T>(
  options: { label: string; value: T }[],
): {
  label: string;
  value: T;
} => options[Math.floor(Math.random() * options.length)];

export const getLastLetter = (str: string): string => str.slice(str.length - 1);

export const getDisplayNameForAddress = (address: Hash): string =>
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

export function getTimeRange(seconds: number): string {
  if (seconds < 0) {
    throw new Error("Seconds cannot be negative");
  }
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000; // Assuming an average month length of 30 days ( We can Adjust it with Moment.js package )

  let result: string;

  switch (true) {
    case seconds >= secondsInMonth:
      const months = Math.floor(seconds / secondsInMonth);
      result = `${months} ${months > 1 ? "Months" : "Month"}`;
      break;
    case seconds >= secondsInDay:
      const days = Math.floor(seconds / secondsInDay);
      result = `${days} ${days > 1 ? "Days" : "Day"}`;
      break;
    case seconds >= secondsInHour:
      const hours = Math.floor(seconds / secondsInHour);
      result = `${hours}  ${hours > 1 ? "Hours" : "Hour"}`;
      break;
    default:
      result = `${seconds} Seconds`;
  }

  return result;
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
    clearTimeout(timeout); // Cancel the previous timeout
    timeout = setTimeout(() => func(...args), wait); // Set a new timeout
  };
};

const units = ["k", "m", "b", "t"];
export function toPrecision(number: number, precision = 1) {
  return number
    .toString()
    .replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), "$1")
    .replace(/(\.[1-9]*)0+$/, "$1")
    .replace(/\.$/, "");
}

export function abbreviateETHBalance(number: number): string {
  if (number < 1) return toPrecision(number, 3);
  if (number < 10 ** 2) return toPrecision(number, 2);
  if (number < 10 ** 4)
    return new Intl.NumberFormat().format(parseFloat(toPrecision(number, 1)));

  const decimalsDivisor = 10 ** 1; // 1 decimal place

  let result = String(number);

  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);

    if (size <= number) {
      // biome-ignore lint/style/noParameterAssign: TODO
      number = (number * decimalsDivisor) / size / decimalsDivisor;

      result = toPrecision(number, 1) + units[i];

      break;
    }
  }

  return result;
}

export const getBetTypeText = (type: BetType): string => {
  switch (type) {
    case "binary":
      return "Bull and Bear";
    case "closest-guess-wins":
      return "Price is Right";
    default:
      return "";
  }
};

export const getBetSideText = (isBetOnUp: boolean) => {
  return isBetOnUp
    ? { leftText: "Price Moons", rightText: "Price Rugs" }
    : { leftText: "Price Rugs", rightText: "Price Moons" };
};

export const getFormattedValue = (value: string, currency: Address) => {
  const isEth = currency === zeroAddress;
  return formatUnits(BigInt(value), isEth ? 18 : STABLECOIN_DECIMALS);
};

export const calculateProfits = (
  bets: BetResponse[],
  currency: string,
  decimals: number,
) => {
  const profits = bets
    .filter((bet) => bet.currency.toLowerCase() === currency.toLowerCase())
    .reduce((acc, bet) => acc + parseFloat(bet.value) * 2, 0); // multiplying with 2 as user will receive wagered funds as well as the loser's funds
  return +formatUnits(BigInt(profits), decimals);
};

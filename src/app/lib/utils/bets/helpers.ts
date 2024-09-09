import { BetResponse, BetType, Hash } from "@/app/lib/utils/bets/types";

export const shortenHash = (hash: string, shortenBy?: number): string =>
  `${hash.substring(0, shortenBy ?? 4)}...${hash.substring(hash.length - (shortenBy ?? 4))}`;

export const isBetConcluded = (bet: BetResponse): boolean =>
  bet.winner !== null;

export const isTimestampInFuture = (timestampInSeconds: number): boolean =>
  timestampInSeconds > Date.now() / 1000;

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

export function toPrecision(number: number, precision = 1) {
  return number
    .toString()
    .replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), "$1")
    .replace(/(\.[1-9]*)0+$/, "$1")
    .replace(/\.$/, "");
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
export const getBetImageUrl = (type: BetType): string => {
  switch (type) {
    case "binary":
      return "/games/bull_or_bear.webp";
    case "closest-guess-wins":
      return "/games/price_is_right.webp";
    default:
      return "";
  }
};

export function formatNumberToSignificantDigits(number: number): string {
  let numStr = number.toString();

  if (numStr.includes("e")) {
    numStr = number.toFixed(20);
  }

  let decimalIndex = numStr.indexOf(".");
  if (decimalIndex !== -1) {
    let firstNonZeroAfterDecimal = numStr
      .slice(decimalIndex + 1)
      .search(/[1-9]/);
    if (firstNonZeroAfterDecimal !== -1) {
      let precision = decimalIndex + firstNonZeroAfterDecimal + 3;
      numStr = numStr.slice(0, precision);
    } else {
      numStr = numStr.slice(0, decimalIndex + 3);
    }
  }

  numStr = numStr.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
  const [integerPart, decimalPart] = numStr.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ",",
  );

  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
}

export const formatDateTime = (date: Date): string => {
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart}, ${timePart}`;
};

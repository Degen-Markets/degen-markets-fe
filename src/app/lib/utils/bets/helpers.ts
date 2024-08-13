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
  MetricSort,
  TickerCmcApiData,
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
export const isBetExpired = (bet: BetResponse): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return (
    bet.acceptor === null &&
    currentTime > Number(bet.creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT &&
    bet.winner === null
  );
};
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

export const getBetSideText = (isBetOnUp: boolean) => {
  return isBetOnUp
    ? { leftText: "Price Moons", rightText: "Price Rugs" }
    : { leftText: "Price Rugs", rightText: "Price Moons" };
};

interface GetetOutComeProps {
  text: string;
  status: boolean;
}
export const getBetOutcome = (
  type: BetType,
  isBetOnUp: boolean,
  startingMetricValue: number | null,
  endingMetricValue: number | null,
  strikePriceCreator: number,
  strikePriceAcceptor: number,
): { outcome: GetetOutComeProps; bgImage: string } => {
  if (type === "binary") {
    const startingValue = Number(startingMetricValue);
    const endingValue = Number(endingMetricValue);

    if (isBetOnUp) {
      return endingValue > startingValue
        ? {
            outcome: { text: "Price Moon", status: true },
            bgImage: "/profile/Moon.webp",
          }
        : {
            outcome: { text: "Price Rugs", status: false },
            bgImage: "/profile/Rug.webp",
          };
    } else {
      return endingValue < startingValue
        ? {
            outcome: { text: "Price Moon", status: true },
            bgImage: "/profile/Moon.webp",
          }
        : {
            outcome: { text: "Price Rugs", status: false },
            bgImage: "/profile/Rug.webp",
          };
    }
  } else if (type === "closest-guess-wins") {
    const creatorStrikePrice = Number(strikePriceCreator);
    const acceptorStrikePrice = Number(strikePriceAcceptor);
    const endingValue = Number(endingMetricValue);

    const diffCreator = Math.pow(endingValue - creatorStrikePrice, 2); // squared difference
    const diffAcceptor = Math.pow(endingValue - acceptorStrikePrice, 2); // squared difference

    return diffCreator < diffAcceptor
      ? {
          outcome: { text: "Price Moon", status: true },
          bgImage: "/profile/Moon.webp",
        }
      : {
          outcome: { text: "Price Rugs", status: false },
          bgImage: "/profile/Rug.webp",
        };
  } else {
    return {
      outcome: { text: "Unknown Bet Type", status: false },
      bgImage: "",
    };
  }
};

export const getBetStatus = (bet: BetResponse) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired =
    !bet.acceptor &&
    currentTime > Number(bet.creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT;
  const isEnded = !!bet.winner;

  if (isEnded) {
    return { status: "Ended", statusClass: "bg-gray-500" };
  } else if (isExpired) {
    return { status: "Expired", statusClass: "bg-red-main" };
  } else {
    return { status: "Running", statusClass: "bg-green-main" };
  }
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

export const getUserRole = (
  user: Address,
  winner: Address | null,
  creator: Address,
  acceptor: Address | null,
) => {
  if (!winner) return "";
  return winner === user
    ? "winner"
    : user === (winner === creator ? acceptor : creator)
      ? "loser"
      : "";
};

export const calculateBetStats = (bets: BetResponse[], address: Address) => {
  const totalBets = bets.length;
  const totalWins = bets.filter(
    (bet) => bet.winner?.toLowerCase() === address?.toLowerCase(),
  ).length;
  // Total bets for each type
  const totalBinaryBets = bets.filter((bet) => bet.type === "binary").length;
  const totalClosestGuessBets = bets.filter(
    (bet) => bet.type === "closest-guess-wins",
  ).length;

  // Wins for each type
  const totalBinaryWins = bets.filter(
    (bet) =>
      bet.type === "binary" &&
      bet.winner?.toLowerCase() === address?.toLowerCase(),
  ).length;
  const totalClosestGuessWins = bets.filter(
    (bet) =>
      bet.type === "closest-guess-wins" &&
      bet.winner?.toLowerCase() === address?.toLowerCase(),
  ).length;

  // Win percentages for each type
  const binaryWinPercentage =
    totalBinaryBets > 0 ? (totalBinaryWins / totalBinaryBets) * 100 : 0;
  const closestGuessWinPercentage =
    totalClosestGuessBets > 0
      ? (totalClosestGuessWins / totalClosestGuessBets) * 100
      : 0;
  const winPercentage = totalBets > 0 ? (totalWins / totalBets) * 100 : 0;

  const winPercentages = {
    totalBullOrBearBets: totalBinaryBets,
    totalThePriceIsRightBets: totalClosestGuessBets,
    bullOrBearWinPercentage: +binaryWinPercentage.toFixed(1),
    thePriceIsRightWinPercentage: +closestGuessWinPercentage.toFixed(1),
    totalBullOrBearWins: totalBinaryWins,
    totalThePriceIsRightWins: totalClosestGuessWins,
    totalWinPercentage: +winPercentage.toFixed(1),
  };
  return winPercentages;
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

export function getEthPrice(
  tickerCmcResponse: TickerCmcApiData,
): number | null {
  const ethToken = Object.values(tickerCmcResponse).find(
    (token) => token.id === 1027,
  );

  return ethToken ? ethToken.quote.USD.price : null;
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

export const sortPrettySearchTokens = (
  tokens: TickerCmcApiData[],
  criteria: MetricSort,
  order: string,
) => {
  return tokens.sort((a, b) => {
    let aValue: number, bValue: number;

    switch (criteria) {
      case Metric.PRICE:
        aValue = a.quote.USD.price ?? 0;
        bValue = b.quote.USD.price ?? 0;
        break;
      case Metric.VOLUME:
        aValue = a.quote.USD.volume_24h ?? 0;
        bValue = b.quote.USD.volume_24h ?? 0;
        break;
      case Metric.MARKET_CAP_DOMINANCE:
        aValue = a.quote.USD.market_cap_dominance ?? 0;
        bValue = b.quote.USD.market_cap_dominance ?? 0;
        break;
      default:
        aValue = 0;
        bValue = 0;
    }

    return order === "asc" ? aValue - bValue : bValue - aValue;
  });
};

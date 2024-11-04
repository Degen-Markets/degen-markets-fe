import { PlayerStats } from "@/app/types/player";
const LAMPORTS_PER_SOL = 1_000_000_000n;

export const getDisplayNameForAddress = (address: string): string =>
  address.slice(0, 4) + "..." + address.slice(-5);

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

function validateInput(value: bigint | string): bigint {
  if (value === null || value === undefined) {
    throw new Error("Input cannot be null or undefined");
  }

  try {
    if (typeof value === "bigint") {
      return value;
    }

    if (typeof value === "string") {
      const cleanedValue = value.trim().replace(/,/g, "");

      if (!/^-?\d+(\.\d+)?$/.test(cleanedValue)) {
        throw new Error(`Invalid number format: ${value}`);
      }

      return BigInt(cleanedValue);
    }

    throw new Error(`Unsupported input type: ${typeof value}`);
  } catch (error) {
    throw new Error(
      `Invalid input: ${value} - ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

function getAbsoluteValue(value: bigint): {
  isNegative: boolean;
  absValue: bigint;
} {
  const isNegative = value < 0n;
  const absValue = isNegative ? -value : value;
  return { isNegative, absValue };
}

function validateDecimalPlaces(decimalPlaces: number): void {
  if (decimalPlaces < 0 || decimalPlaces > 10) {
    throw new Error(`Decimal places must be between 0 and 10`);
  }
}

export function formatWithPrecision(
  value: bigint | string,
  divisor: bigint,
  decimalPlaces: number,
  showLabel: boolean = false,
): string {
  const validatedValue = validateInput(value);
  validateDecimalPlaces(decimalPlaces);

  if (divisor === 0n) {
    throw new Error("Division by zero is not allowed");
  }

  if (validatedValue === 0n) {
    return showLabel ? `0 SOL` : "0";
  }

  const { isNegative, absValue } = getAbsoluteValue(validatedValue);

  // Using absValue, simplifies mathematical operations (division, remainder)
  // by working with positive numbers. This prevents issues that can arise
  // from operating on negative numbers. We reintroduce the sign later to
  // ensure the output accurately reflects the original value without
  // risking output like "-1.-1 SOL". etc

  const integerPart = absValue / divisor;
  const remainder = absValue % divisor;

  const decimalMultiplier = BigInt(10 ** decimalPlaces);
  const decimalPart = (remainder * decimalMultiplier) / divisor;

  let formattedDecimalPart = decimalPart
    .toString()
    .padStart(decimalPlaces, "0")
    .replace(/0+$/, ""); // remove trailing zeros eg *.003001200 -> *.0030012 etc

  return `${isNegative ? "-" : ""}${integerPart}${
    formattedDecimalPart ? "." + formattedDecimalPart : ""
  }${showLabel ? ` SOL` : ""}`.trim();
}

export function formatSolBalance(
  value: bigint | string,
  showLabel: boolean = true,
): string {
  return formatWithPrecision(value, LAMPORTS_PER_SOL, 5, showLabel);
}

export function calculatePercentage(
  value: bigint | string,
  divisor: bigint,
  decimalPlaces: number = 2,
): string {
  const validatedValue = validateInput(value);
  validateDecimalPlaces(decimalPlaces);

  if (divisor === 0n) {
    return "0.00";
  }

  const { isNegative, absValue } = getAbsoluteValue(validatedValue);

  const multiplier = BigInt(10 ** (decimalPlaces + 2));
  const percentage = (absValue * multiplier) / divisor;

  const integerPart = percentage / BigInt(10 ** decimalPlaces);
  const decimalPart = percentage % BigInt(10 ** decimalPlaces);

  let formattedDecimalPart = decimalPart
    .toString()
    .padStart(decimalPlaces, "0");

  return `${isNegative ? "-" : "+"}${integerPart}.${formattedDecimalPart.padEnd(
    decimalPlaces,
    "0",
  )}%`;
}

export function solBalance(
  balance: string | bigint,
  showSolLabel: boolean = true,
): string {
  return formatSolBalance(balance, showSolLabel);
}

export function calculatePlayerPnL(playerStats: PlayerStats): {
  totalPnL: bigint;
  pnlPercentage: string;
} {
  let totalWinningAmount = 0n;
  let totalBetAmount = 0n;

  playerStats.poolEntries.forEach((entry) => {
    const userAmount = BigInt(entry.value);
    const poolValue = BigInt(entry.pool.totalValue);
    const optionValue = BigInt(entry.option.totalValue);

    totalBetAmount += userAmount;

    if (optionValue !== 0n) {
      const winningAmount = (userAmount * poolValue) / optionValue;
      totalWinningAmount += winningAmount;
    }
  });

  const totalPnL = totalWinningAmount - totalBetAmount;
  let pnlPercentage = "0";

  if (totalBetAmount !== 0n) {
    pnlPercentage = calculatePercentage(totalPnL, totalBetAmount);
  }
  return {
    totalPnL,
    pnlPercentage,
  };
}

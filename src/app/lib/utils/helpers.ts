import { PlayerStats } from "@/app/types/player";

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

export function solBalance(
  balance: number | string | bigint,
  showSolLabel: boolean = true,
): string {
  const formatter = new BigIntFormatter(balance);

  return formatter.formatSolBalance(showSolLabel);
}

export function calculatePlayerPnL(playerStats: PlayerStats): {
  totalPnL: number;
  pnlPercentage: number;
} {
  let totalWinningAmount = 0n;
  let totalBetAmount = 0n;

  playerStats.poolEntries.forEach((entry) => {
    const userAmount = BigInt(entry.value);
    const poolValue = BigInt(entry.pool.totalValue);
    const optionValue = BigInt(entry.option.totalValue);

    totalBetAmount += userAmount;

    if (optionValue !== 0n) {
      const winningAmount = (userAmount * optionValue) / poolValue;
      totalWinningAmount += winningAmount;
    }
  });

  const totalPnL = totalWinningAmount - totalBetAmount;

  const formatter = new BigIntFormatter(totalPnL);
  const pnlPercentage = +formatter.calculatePercentage(totalBetAmount);

  return {
    totalPnL: Number(totalPnL),
    pnlPercentage,
  };
}

class BigIntFormatter {
  private value: bigint;

  constructor(value: bigint | number | string) {
    this.value = typeof value === "bigint" ? value : BigInt(value);
  }

  // Returns the integer and decimal parts with desired precision
  formatWithPrecision(
    divisor: bigint,
    decimalPlaces: number,
    showLabel: string = "",
  ): string {
    if (this.value === 0n) {
      return showLabel ? `0 ${showLabel}` : "0";
    }

    const isNegative = this.value < 0n;
    const absValue = isNegative ? -this.value : this.value;

    // Integer part and decimal part calculation
    const integerPart = absValue / divisor;
    const remainder = absValue % divisor;
    const decimalPart = (remainder * BigInt(10 ** decimalPlaces)) / divisor;

    // Format decimal part with padding and trimming
    let formattedDecimalPart = decimalPart
      .toString()
      .padStart(decimalPlaces, "0");
    formattedDecimalPart = formattedDecimalPart.replace(/0+$/, "");

    return `${isNegative ? "-" : ""}${integerPart}${formattedDecimalPart ? "." + formattedDecimalPart : ""}${showLabel ? ` ${showLabel}` : ""}`;
  }

  // Specific method for Solana balance (with 5 decimal places)
  formatSolBalance(showLabel: boolean = true): string {
    const LAMPORTS_PER_SOL = 1_000_000_000n;
    return this.formatWithPrecision(
      LAMPORTS_PER_SOL,
      5,
      showLabel ? "SOL" : "",
    );
  }

  // Specific method for calculating percentage with 2 decimal places
  calculatePercentage(totalAmount: bigint, decimalPlaces: number = 2): string {
    if (totalAmount === 0n) {
      return "0.00";
    }
    const isNegative = this.value < 0n;
    const absValue = isNegative ? -this.value : this.value;

    const percentage =
      (absValue * BigInt(10 ** (decimalPlaces + 2))) / totalAmount;
    const integerPart = percentage / BigInt(10 ** decimalPlaces);
    const decimalPart = percentage % BigInt(10 ** decimalPlaces);

    let formattedDecimalPart = decimalPart
      .toString()
      .padStart(decimalPlaces, "0");

    formattedDecimalPart = formattedDecimalPart.replace(/0+$/, "");

    return `${isNegative ? "-" : ""}${integerPart}.${formattedDecimalPart}`;
  }
}

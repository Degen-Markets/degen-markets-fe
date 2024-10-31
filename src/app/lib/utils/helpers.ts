import { PlayerStats } from "@/app/types/player";
import { BigIntFormatter } from "./bigintFormat";

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
  balance: string | bigint,
  showSolLabel: boolean = true,
): string {
  const formatter = new BigIntFormatter(balance);

  return formatter.formatSolBalance(showSolLabel);
}

export function calculatePlayerPnL(playerStats: PlayerStats): {
  totalPnL: bigint;
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
  let pnlPercentage = 0;

  if (totalBetAmount !== 0n) {
    const formatter = new BigIntFormatter(totalPnL);
    pnlPercentage = +formatter.calculatePercentage(totalBetAmount);
  }
  return {
    totalPnL,
    pnlPercentage,
  };
}

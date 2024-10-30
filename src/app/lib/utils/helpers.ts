import { PlayerStats } from "@/app/types/player";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

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
  balance: number | string,
  showSolLabel: boolean = true,
) {
  const balanceNumber =
    typeof balance === "string" ? parseFloat(balance) : balance;

  if (isNaN(balanceNumber)) {
    return showSolLabel ? "0 SOL" : "0";
  }

  const formattedBalance =
    Math.round((balanceNumber / LAMPORTS_PER_SOL) * 100000) / 100000;

  return showSolLabel ? `${formattedBalance} SOL` : `${formattedBalance}`;
}

export function calculatePlayerPnL(playerStats: PlayerStats): {
  totalPnL: number;
  pnlPercentage: number;
} {
  const winningOptions: Record<string, number> = {};
  let totalWinningAmount = 0;
  let totalBetAmount = 0;

  playerStats.poolEntries.forEach((entry) => {
    const userAmount = parseFloat(entry.value);
    const poolValue = parseFloat(entry.pool.totalValue);
    const totalValue = parseFloat(entry.option.totalValue);

    totalBetAmount += userAmount;

    if (totalValue > 0) {
      winningOptions[entry.option.address] = totalValue;

      const winningAmount = (userAmount / totalValue) * poolValue;
      totalWinningAmount += winningAmount;
    }
  });

  const totalPnL = totalWinningAmount - totalBetAmount;
  const pnlPercentage =
    totalBetAmount > 0
      ? ((totalWinningAmount - totalBetAmount) / totalBetAmount) * 100
      : 0; // Handle division by zero case

  return {
    totalPnL,
    pnlPercentage,
  };
}

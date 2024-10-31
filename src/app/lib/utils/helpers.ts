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

export function solBalance(
  balance: number | string | bigint,
  showSolLabel: boolean = true,
) {
  const balanceBigInt = typeof balance === "bigint" ? balance : BigInt(balance);

  if (balanceBigInt === 0n) {
    return showSolLabel ? "0 SOL" : "0";
  }

  const solBalance = balanceBigInt / LAMPORTS_PER_SOL;
  const remainder = balanceBigInt % LAMPORTS_PER_SOL;

  const formattedBalance = `${solBalance}.${((remainder * 100000n) / LAMPORTS_PER_SOL).toString().padStart(5, "0")}`;

  return showSolLabel ? `${formattedBalance} SOL` : formattedBalance;
}

export function calculatePlayerPnL(playerStats: PlayerStats): {
  totalPnL: bigint;
  pnlPercentage: bigint;
} {
  const winningOptions: Record<string, bigint> = {};
  let totalWinningAmount = 0n;
  let totalBetAmount = 0n;

  playerStats.poolEntries.forEach((entry) => {
    const userAmount = BigInt(entry.value);
    const poolValue = BigInt(entry.pool.totalValue);
    const totalValue = BigInt(entry.option.totalValue);

    totalBetAmount += userAmount;

    if (totalValue !== 0n) {
      winningOptions[entry.option.address] = totalValue;

      const winningAmount = (userAmount * poolValue) / totalValue;
      totalWinningAmount += winningAmount;
    }
  });

  const totalPnL = totalWinningAmount - totalBetAmount;
  const pnlPercentage =
    totalBetAmount === 0n ? 0n : (totalPnL * 100n) / totalBetAmount;

  return {
    totalPnL,
    pnlPercentage,
  };
}

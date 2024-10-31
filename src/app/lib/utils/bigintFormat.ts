export class BigIntFormatter {
  private value: bigint;
  private static readonly MAX_DECIMAL_PLACES = 10;

  constructor(value: bigint | string) {
    if (value === null || value === undefined) {
      throw new Error("Input cannot be null or undefined");
    }

    try {
      if (typeof value === "bigint") {
        this.value = value;
      } else if (typeof value === "string") {
        const cleanedValue = value.trim().replace(/,/g, "");

        if (!/^-?\d+(\.\d+)?$/.test(cleanedValue)) {
          throw new Error(`Invalid number format: ${value}`);
        }

        this.value = BigInt(cleanedValue);
      } else {
        throw new Error(`Unsupported input type: ${typeof value}`);
      }
    } catch (error) {
      throw new Error(
        `Invalid input: ${value} - ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  formatWithPrecision(
    divisor: bigint,
    decimalPlaces: number,
    showLabel: string = "",
  ): string {
    if (divisor === 0n) {
      throw new Error("Division by zero is not allowed");
    }

    if (
      decimalPlaces < 0 ||
      decimalPlaces > BigIntFormatter.MAX_DECIMAL_PLACES
    ) {
      throw new Error(
        `Decimal places must be between 0 and ${BigIntFormatter.MAX_DECIMAL_PLACES}`,
      );
    }

    // Handle zero value
    if (this.value === 0n) {
      return showLabel ? `0 ${showLabel}` : "0";
    }

    const isNegative = this.value < 0n;
    const absValue = isNegative ? -this.value : this.value;

    const integerPart = absValue / divisor;
    const remainder = absValue % divisor;

    const decimalMultiplier = BigInt(10 ** decimalPlaces);
    const decimalPart = (remainder * decimalMultiplier) / divisor;

    let formattedDecimalPart = decimalPart
      .toString()
      .padStart(decimalPlaces, "0")
      .replace(/0+$/, "");

    return `${isNegative ? "-" : ""}${integerPart}${
      formattedDecimalPart ? "." + formattedDecimalPart : ""
    }${showLabel ? ` ${showLabel}` : ""}`.trim();
  }

  formatSolBalance(showLabel: boolean = true): string {
    const LAMPORTS_PER_SOL = 1_000_000_000n;
    return this.formatWithPrecision(
      LAMPORTS_PER_SOL,
      5,
      showLabel ? "SOL" : "",
    );
  }

  calculatePercentage(totalAmount: bigint, decimalPlaces: number = 2): string {
    if (totalAmount === 0n) {
      return "0.00"; // Consistent decimal places
    }

    if (decimalPlaces < 0 || decimalPlaces > 10) {
      throw new Error("Decimal places for percentage must be between 0 and 10");
    }

    const isNegative = this.value < 0n;
    const absValue = isNegative ? -this.value : this.value;

    // Check for potential overflow
    const maxSafeValue = BigInt("1" + "0".repeat(15));
    if (absValue > maxSafeValue || totalAmount > maxSafeValue) {
      throw new Error("Values too large for safe percentage calculation");
    }

    const multiplier = BigInt(10 ** (decimalPlaces + 2));
    const percentage = (absValue * multiplier) / totalAmount;

    const integerPart = percentage / BigInt(10 ** decimalPlaces);
    const decimalPart = percentage % BigInt(10 ** decimalPlaces);

    let formattedDecimalPart = decimalPart
      .toString()
      .padStart(decimalPlaces, "0");

    return `${isNegative ? "-" : ""}${integerPart}.${formattedDecimalPart.padEnd(
      decimalPlaces,
      "0",
    )}`;
  }
}

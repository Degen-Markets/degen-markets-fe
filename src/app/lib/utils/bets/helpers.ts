import { metricOptions, SETTLE_CURRENCY } from "@/app/lib/utils/bets/constants";
import { Currency, Metric } from "@/app/lib/utils/bets/types";

export const betDurationInDays = (duration: string): string => {
  const days = Number(duration) / 86400;
  return days > 1 ? `${days} days` : `${days} day`;
};

export const getCurrencySymbolByAddress = (
  address: string,
): Currency | undefined => {
  for (const [key, value] of Object.entries(SETTLE_CURRENCY)) {
    if (value.toLowerCase() === address.toLowerCase()) {
      return key as Currency;
    }
  }
  return undefined;
};

export const getHumanFriendlyMetric = (metric: Metric): string =>
  metricOptions.find((option) => option.value === metric)?.label || "price";

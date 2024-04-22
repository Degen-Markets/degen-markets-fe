import { SETTLE_CURRENCY } from "@/app/lib/utils/bets/constants";

export const betDurationInDays = (duration: string): string => {
  const days = Number(duration) / 86400;
  return days > 1 ? `${days} days` : `${days} day`;
};

export const getCurrencySymbolByAddress = (address: string): string => {
  for (const [key, value] of Object.entries(SETTLE_CURRENCY)) {
    if (value.toLowerCase() === address.toLowerCase()) {
      return key;
    }
  }
  return "";
};

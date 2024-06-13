import { SETTLE_CURRENCY } from "@/app/lib/utils/bets/constants";
import { Currency } from "@/app/lib/utils/bets/types";

function getCurrencyByAddress(address: string): Currency | null {
  for (const currency in SETTLE_CURRENCY) {
    if (SETTLE_CURRENCY[currency as Currency] === address) {
      return currency as Currency;
    }
  }
  return null;
}

export default getCurrencyByAddress;

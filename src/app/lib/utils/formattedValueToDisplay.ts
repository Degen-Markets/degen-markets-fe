import { formatUnits } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";
import { Address, Currency } from "@/app/lib/utils/bets/types";
import getCurrencyByAddress from "@/app/lib/getCurrencyByAddress";

const formattedValueToDisplay = (value: string, currencyAddress: Address) => {
  const currency = getCurrencyByAddress(currencyAddress) || "";
  const isEth = currency === Currency.ETH;
  return formatUnits(BigInt(value), isEth ? 18 : STABLECOIN_DECIMALS);
};

export default formattedValueToDisplay;

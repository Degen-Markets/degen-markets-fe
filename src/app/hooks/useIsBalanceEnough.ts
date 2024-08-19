import { useMemo } from "react";
import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { useBalanceContext } from "@/app/components/RecentActivity/BalanceContext";

const useIsBalanceEnough = (currency: string, value: bigint) => {
  const { userBalances } = useBalanceContext();
  const currencySymbol = useMemo(
    () => getCurrencySymbolByAddress(currency),
    [currency],
  );

  return useMemo(
    () => userBalances[currencySymbol] >= value,
    [userBalances, currencySymbol, value],
  );
};

export default useIsBalanceEnough;

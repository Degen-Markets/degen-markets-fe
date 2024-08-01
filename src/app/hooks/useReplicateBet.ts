import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useReplicateBet = (router: AppRouterInstance) => {
  return (bet: BetResponse) => {
    const {
      ticker,
      metric,
      isBetOnUp,
      value,
      currency,
      strikePriceCreator,
      expirationTimestamp,
      creationTimestamp,
      type,
    } = bet;
    const durationInSeconds = Math.round(
      ((Number(expirationTimestamp) - Number(creationTimestamp)) /
        (24 * 60 * 60)) *
        86400,
    );
    const direction = isBetOnUp ? "up" : "down";
    const isEth = currency === zeroAddress;

    const formattedValueToDisplay = formatUnits(
      BigInt(value),
      isEth ? 18 : STABLECOIN_DECIMALS,
    );

    const url =
      type === "closest-guess-wins"
        ? `/games/price-is-right/create-bet?ticker=${ticker}&metric=${metric}&direction=${direction}&duration=${durationInSeconds}&currency=${currency}&value=${formattedValueToDisplay}&strikePriceCreator=${strikePriceCreator}`
        : `/create-bet?ticker=${ticker}&metric=${metric}&direction=${direction}&duration=${durationInSeconds}&currency=${currency}&value=${formattedValueToDisplay}`;

    router.push(url);
  };
};

export default useReplicateBet;

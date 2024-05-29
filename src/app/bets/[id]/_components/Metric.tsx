import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";

interface Props {
  bet: BetResponse;
  hideStartingMetric?: boolean;
}

const Metric = ({ bet, hideStartingMetric }: Props) => {
  const {
    ticker,
    metric,
    expirationTimestamp,
    value,
    currency,
    isBetOnUp,
    creationTimestamp,
    startingMetricValue,
  } = bet;

  const direction = isBetOnUp ? "up" : "down";
  const isEth = currency === zeroAddress;
  const formattedValueToDisplay = formatUnits(
    BigInt(value),
    isEth ? 18 : STABLECOIN_DECIMALS,
  );
  const expirationDays = Math.round(
    (Number(expirationTimestamp) - Number(creationTimestamp)) / (24 * 60 * 60),
  );

  return (
    <div className="text-xl">
      <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 text-center md:text-left mt-8 md:mt-0 md:-translate-y-1/2">
        <div className="bg-prussian-dark border-white border-2 text-white p-2">
          {ticker}&nbsp;-&nbsp;{metric} will&nbsp; go&nbsp;
          {direction}&nbsp;in&nbsp;
          {expirationDays}
          &nbsp;day(s)
        </div>
        <div className="bg-prussian-dark border-white border-2 text-white p-2">
          Wagered:&nbsp;{formattedValueToDisplay}&nbsp;
          {getCurrencySymbolByAddress(currency)}
        </div>
      </div>
      {startingMetricValue && !hideStartingMetric && (
        <div className="flex justify-center">
          <span className="bg-prussian-dark border-white border-2 text-white p-2 mt-4 md:-mt-4">
            starting {metric}: ${Number(startingMetricValue).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Metric;

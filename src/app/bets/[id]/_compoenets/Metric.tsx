import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";

interface Props {
  bet: BetResponse;
}

const Metric = ({ bet }: Props) => {
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
  const valueToDisplay = formatUnits(
    BigInt(value),
    isEth ? 18 : STABLECOIN_DECIMALS,
  );
  const daysUntilExpiration = Math.round(
    (Number(expirationTimestamp) - Number(creationTimestamp)) / (24 * 60 * 60),
  );
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 text-center md:text-left mt-4 md:mt-0 md:-translate-y-1/2">
        <div className="bg-white border-purple-medium border-8 text-neutral-800 px-4">
          {ticker}&nbsp;-&nbsp;{metric} will&nbsp; go&nbsp;
          {direction}&nbsp;in&nbsp;
          {daysUntilExpiration}
          &nbsp;day(s)
        </div>
        <div className="bg-white border-purple-medium border-8 text-neutral-800 px-4">
          Wagered:&nbsp;{valueToDisplay}&nbsp;
          {getCurrencySymbolByAddress(currency)}
        </div>
      </div>
      {startingMetricValue && (
        <div className="flex justify-center">
          <span className=" bg-white border-purple-medium border-4 text-neutral-800 px-4 -mt-4">
            starting {metric}: ${Number(startingMetricValue).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Metric;

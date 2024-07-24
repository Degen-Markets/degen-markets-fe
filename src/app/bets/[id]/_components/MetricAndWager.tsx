import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";
import MetricDisplay from "@/app/components/Metric";

interface Props {
  bet: BetResponse;
  hideStartingMetric?: boolean;
}

const MetricAndWager = ({ bet, hideStartingMetric }: Props) => {
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

  const isEth = currency === zeroAddress;
  const formattedValueToDisplay = formatUnits(
    BigInt(value),
    isEth ? 18 : STABLECOIN_DECIMALS,
  );

  return (
    <div className="text-xl">
      <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 text-center md:text-left mt-8 md:mt-0 md:-translate-y-1/2">
        <div className="bg-prussian-dark border-white border-2 text-white p-2 rounded-xl">
          <div className="flex gap-2">
            <span>{ticker}</span>{" "}
            <MetricDisplay
              betType={bet.type}
              metric={bet.metric}
              isBetOnUp={isBetOnUp}
              creationTimestamp={creationTimestamp}
              expirationTimestamp={expirationTimestamp}
              className="text-white !rounded-xl"
            />
          </div>
        </div>
        <div className="bg-prussian-dark border-white border-2 text-white p-2 rounded-xl">
          Wagered:&nbsp;{formattedValueToDisplay}&nbsp;
          {getCurrencySymbolByAddress(currency)}
        </div>
      </div>
      {startingMetricValue && !hideStartingMetric && (
        <div className="flex justify-center mt-5">
          <span className="bg-prussian-dark text-white p-2 px-6 mt-4 md:-mt-6 rounded-xl border-2 font-bold">
            starting {metric}: ${Number(startingMetricValue).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricAndWager;

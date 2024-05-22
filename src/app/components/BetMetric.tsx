import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";
import Image from "next/image";

interface Props {
  bet: BetResponse;
}

const BetMetric = ({ bet }: Props) => {
  const {
    ticker,
    metric,
    expirationTimestamp,
    value,
    currency,
    isBetOnUp,
    creationTimestamp,
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
    <div className="flex justify-between  bg-pippin text-prussian-dark px-2 py-3 md:text-xl w-full">
      <div>{ticker}</div>
      <div
        className={`flex gap-x-1 ${direction === "up" ? "text-green-700" : "text-red-700"}`}
      >
        {metric}
        <Image
          src={`/icons/${direction}.png`}
          alt={direction}
          width={33}
          height={30}
        />
      </div>
      <div>{expirationDays} day(s)</div>
      <div>
        {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
      </div>
    </div>
  );
};

export default BetMetric;

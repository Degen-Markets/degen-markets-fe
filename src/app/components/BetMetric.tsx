import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";
import React from "react";
import Image from "next/image";

interface Props {
  bet: BetResponse;
  className?: string;
}

const BetMetric = ({ bet, className }: Props) => {
  const {
    ticker,
    metric,
    expirationTimestamp,
    value,
    currency,
    isBetOnUp,
    creationTimestamp,
    type,
  } = bet;

  const isEth = currency === zeroAddress;
  const formattedValueToDisplay = formatUnits(
    BigInt(value),
    isEth ? 18 : STABLECOIN_DECIMALS,
  );
  const expirationDays = Math.round(
    (Number(expirationTimestamp) - Number(creationTimestamp)) / (24 * 60 * 60),
  );

  return (
    <div
      className={`flex justify-between text-prussian-dark px-2 py-3 md:text-xl w-full ${className}`}
    >
      <div>{ticker}</div>
      <div
        className={`flex gap-x-1 ${isBetOnUp ? "text-green-700" : "text-red-700"}`}
      >
        {metric}
        {type === "binary" &&
          (bet.isBetOnUp ? (
            <Image src="/ArrowUp.svg" width={24} height={24} alt="arrow-up" />
          ) : (
            <Image
              src="/ArrowDown.svg"
              width={24}
              height={24}
              alt="arrow-down"
            />
          ))}
      </div>
      <div>{expirationDays} day(s)</div>
      <div>
        {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
      </div>
    </div>
  );
};

export default BetMetric;

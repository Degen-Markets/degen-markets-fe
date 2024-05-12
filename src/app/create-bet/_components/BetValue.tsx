"use client";

import React, { ChangeEvent } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Currency } from "@/app/lib/utils/bets/types";

const BetValue: React.FC<{ ethPrice: number | null }> = ({ ethPrice }) => {
  const { currency, value, setValue, ticker, duration, metric, direction } =
    useBetContext();

  const isEth = currency.label === Currency.ETH;

  const calculatedValue =
    isEth && ethPrice ? (Number(value) * ethPrice).toLocaleString() : value;

  const handleValueInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const decimals = newValue.split(/\,|\./)[1];
    if (!decimals || decimals.length < 7) {
      setValue(newValue);
    }
  };

  const totalBetValue = (): string => {
    if (isEth && !ethPrice) {
      return "0";
    } else if (isEth && ethPrice) {
      return (Number(value) * ethPrice).toLocaleString();
    } else {
      return value;
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-[20px]">
        <div className="border-purple-medium border-2 w-max flex justify-center">
          <div className="border-purple-medium border pr-5 pl-5 bg-blue-dark">
            AMOUNT
          </div>
          <input
            className="text-blue-dark text-center"
            type="number"
            lang="en-US"
            step=".000001" // TODO: only allow up to 6 decimals
            value={value}
            onChange={handleValueInput}
          />
        </div>
      </div>
      <div className="text-blue-dark mb-4">
        Bet&nbsp;
        {Number(value) > 0 && (!isEth || (isEth && ethPrice)) ? (
          <span className="text-yellow-light">{`$${calculatedValue} `}</span>
        ) : null}
        that&nbsp;
        {ticker.label}&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {duration.label.toLowerCase()}.
      </div>
    </div>
  );
};

export default BetValue;

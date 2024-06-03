"use client";

import React, { ChangeEvent } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Currency } from "@/app/lib/utils/bets/types";

const BetValue: React.FC<{ ethPrice: number | null }> = ({ ethPrice }) => {
  const {
    currency,
    value,
    setValue,
    ticker,
    duration,
    metric,
    direction,
    isProMode,
    customDuration,
  } = useBetContext();

  const isEth = currency.label === Currency.ETH;
  const durationLabel = isProMode
    ? customDuration.label.toLowerCase()
    : duration.label.toLowerCase();

  const calculatedValue =
    isEth && ethPrice ? (Number(value) * ethPrice).toLocaleString() : value;

  const handleValueInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const decimals = newValue.split(/\,|\./)[1];
    if (!decimals || decimals.length < 7) {
      setValue(newValue);
    }
  };

  return (
    <>
      {isProMode ? null : (
        <div className="flex justify-center mt-[20px]">
          <div className="border-purple-medium border-2 w-max flex justify-center">
            <div className="border-purple-medium border pr-5 pl-5 bg-prussian-dark">
              AMOUNT
            </div>
            <div className="relative">
              <input
                className="text-blue-dark text-center"
                type="number"
                lang="en-US"
                step=".000001"
                value={value}
                onChange={handleValueInput}
              />
              <span className="text-prussian-dark absolute top-0 right-2">
                {currency.label}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="text-prussian-dark mb-4 text-xl">
        Bet&nbsp;
        {Number(value) > 0 && (!isEth || (isEth && ethPrice)) ? (
          <span className="text-yellow-light">{`$${calculatedValue} `}</span>
        ) : null}
        that&nbsp;
        {ticker.label}&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {durationLabel}.
      </div>
    </>
  );
};

export default BetValue;

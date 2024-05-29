"use client";
import Reel from "@/app/components/Reel";
import { Metric, Ticker } from "@/app/lib/utils/bets/types";
import {
  currencyOptions,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import React from "react";
import { useBetContext } from "@/app/create-bet/BetContext";

const SlotMachine: React.FC<{}> = ({}) => {
  const {
    ticker,
    metric,
    direction,
    duration,
    currency,
    setTicker,
    setMetric,
    setDirection,
    setDuration,
    setCurrency,
    randomizeAllOptions,
  } = useBetContext();

  return (
    <div className="pixel-art-border-sm-dark lg:pixel-art-border-lg-dark bg-prussian-dark px-1 md:px-10 pb-5 flex lg:w-4/5 ">
      <div className="w-full grid grid-cols-5 lg:grid-cols-6 lg:gap-0.5">
        <Reel<Ticker>
          selectedOption={ticker}
          setSelectedOption={setTicker}
          reelOptions={tickerOptions}
          title="&nbsp;&nbsp;Bet on:&nbsp;&nbsp;"
        />
        <Reel<Metric>
          selectedOption={metric}
          setSelectedOption={setMetric}
          reelOptions={metricOptions}
          title="&nbsp;Metric:&nbsp;&nbsp;"
        />
        <Reel<boolean>
          selectedOption={direction}
          setSelectedOption={setDirection}
          reelOptions={directionOptions}
          title="Direction:"
        />
        <Reel<number>
          selectedOption={duration}
          setSelectedOption={setDuration}
          reelOptions={durationOptions}
          title="Duration:"
        />
        <Reel<`0x${string}`>
          selectedOption={currency}
          setSelectedOption={setCurrency}
          reelOptions={currencyOptions}
          title="&nbsp;&nbsp;Bet in:&nbsp;&nbsp;"
        />
        <div className="flex items-center p-2 lg:block hidden">
          <img
            onClick={randomizeAllOptions}
            className="cursor-pointer"
            src="../randomize-create-bet-button.svg"
            alt="Randomize options button"
          />
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;

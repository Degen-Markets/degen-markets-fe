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
    <div className="eight-bit-border-20 bg-blue-dark px-5 md:px-10 pb-5 flex">
      <div
        className="flex mt-[-30px] md:mt-[-40px]" /* move reels out of bg on top */
      >
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
      </div>
      <div className="ml-[30px] w-[140px] mt-auto mb-auto lg:block hidden">
        <img
          onClick={randomizeAllOptions}
          className="cursor-pointer"
          src="../randomize-create-bet-button.svg"
          alt="Randomize options button"
        />
      </div>
    </div>
  );
};

export default SlotMachine;

"use client";
import Reel from "@/app/components/Reel";
import { Metric, MetricOption, Ticker } from "@/app/lib/utils/bets/types";
import {
  currencyOptions,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import React, { useEffect } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const SlotMachine: React.FC<{}> = ({}) => {
  const router = useRouter();

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
    setValue,
    randomizeAllOptions,
  } = useBetContext();

  const searchParams = useSearchParams();

  useEffect(() => {
    const defaultTicker = searchParams.get("ticker");
    const defaultMetric = searchParams.get("metric");
    const defaultDirection = searchParams.get("direction");
    const defaultDuration = searchParams.get("duration");
    const defaultCurrency = searchParams.get("currency");
    const defaultValue = searchParams.get("value");

    const defaultMetricOption: MetricOption | undefined = metricOptions.find(
      (option) => option.value === defaultMetric,
    );
    const defaultTickerOption = tickerOptions.find(
      (option) => option.value === defaultTicker,
    );
    const defaultDurationOption = durationOptions.find(
      (option) => option.value === Number(defaultDuration),
    );
    // eslint-disable-next-line no-console
    console.log("defaultDurationOption :", defaultDurationOption);

    const defaultCurrencyOption = currencyOptions.find(
      (option) => option.value === defaultCurrency,
    );
    // eslint-disable-next-line no-console
    console.log("durationOptions :", durationOptions);

    // eslint-disable-next-line no-console
    console.log("defaultDurationOption :", defaultDurationOption);
    // eslint-disable-next-line no-console
    console.log("defaultDuration :", defaultDuration);

    if (defaultTickerOption) setTicker(defaultTickerOption);
    if (defaultMetricOption) setMetric(defaultMetricOption);
    if (defaultDirection) setDirection(direction);
    if (defaultDurationOption) setDuration(defaultDurationOption);
    if (defaultCurrencyOption) setCurrency(defaultCurrencyOption);
    if (defaultValue) setValue(defaultValue);
  }, [searchParams.toString()]);

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

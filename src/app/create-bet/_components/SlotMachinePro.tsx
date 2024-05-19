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
import React, { useEffect, useState } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { useSearchParams } from "next/navigation";
import TokenSearch from "./SearchTicker";
import TimePicker from "./TimePicker";
import { Address } from "viem";
import { Button, ButtonPrimary } from "@/app/components/Button";

const SlotMachinePro: React.FC<{}> = ({}) => {
  const {
    ticker,
    metric,
    direction,
    duration,
    currency,
    customDuration,
    setTicker,
    setMetric,
    setDirection,
    setDuration,
    setCurrency,
    setValue,
  } = useBetContext();

  const searchParams = useSearchParams();
  const defaultTicker = searchParams.get("ticker");
  const defaultMetric = searchParams.get("metric");
  const defaultDirection = searchParams.get("direction");
  const defaultDuration = searchParams.get("duration");
  const defaultCurrency = searchParams.get("currency");
  const defaultValue = searchParams.get("value");

  useEffect(() => {
    const defaultMetricOption: MetricOption | undefined = metricOptions.find(
      (option) => option.value === defaultMetric,
    );
    const defaultTickerOption = tickerOptions.find(
      (option) => option.value === defaultTicker,
    );
    const defaultDurationOption = durationOptions.find(
      (option) => option.value === Number(defaultDuration),
    );

    const defaultCurrencyOption = currencyOptions.find(
      (option) => option.value === defaultCurrency,
    );

    if (defaultTickerOption) setTicker(defaultTickerOption);
    if (defaultMetricOption) setMetric(defaultMetricOption);
    if (defaultDirection) setDirection(direction);
    if (defaultDurationOption) setDuration(defaultDurationOption);
    if (defaultCurrencyOption) setCurrency(defaultCurrencyOption);
    if (defaultValue) setValue(defaultValue);
  }, [
    defaultTicker,
    defaultMetric,
    defaultDirection,
    defaultDuration,
    defaultCurrency,
    defaultValue,
  ]);

  console.log({
    ticker,
    metric,
    direction,
    duration,
    currency,
    customDuration,
  });

  return (
    <div className="eight-bit-border-20 bg-blue-dark px-5 md:px-10 pb-5">
      <div>
        <h3 className="text-4xl">PRO</h3>
        <div className="">
          <div className="flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5">
            <TokenSearch<Ticker>
              selectedOption={ticker}
              setSelectedOption={setTicker}
              placeHolder="Search Token"
              searchOption={tickerOptions}
              title="&nbsp;Bet on:&nbsp;&nbsp;"
            />
            <TimePicker<number> title="Duration:" placeHolder="Search Token" />
          </div>

          <div className="flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5">
            <TokenSearch<Metric>
              selectedOption={metric}
              setSelectedOption={setMetric}
              placeHolder="Search Metric"
              searchOption={metricOptions}
              title="&nbsp;Metric:&nbsp;&nbsp;"
            />
            <TokenSearch<boolean>
              selectedOption={direction}
              setSelectedOption={setDirection}
              placeHolder="Select Direction"
              searchOption={directionOptions}
              title="&nbsp;Direction:"
            />
          </div>
          <div className="flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5">
            <TokenSearch<Address>
              selectedOption={currency}
              setSelectedOption={setCurrency}
              placeHolder="Select Currency"
              searchOption={currencyOptions}
              title="&nbsp;Currency:&nbsp;&nbsp;"
            />
            {/* <div className="w-full">
              <h4 className="pt-3 text-left whitespace-nowrap">Reset Fields</h4>
              <ButtonPrimary
                size="regular"
                className="w-full"
                onClick={() => {
                  resetMachine();
                  setIsRandom(true);
                }}
              >
                Reset
              </ButtonPrimary>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachinePro;

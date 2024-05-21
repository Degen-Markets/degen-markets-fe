"use client";
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
import { useSearchParams } from "next/navigation";
import Dropdown from "./Dropdown";
import TimePicker from "./TimePicker";
import { Address } from "viem";

const BetProForm: React.FC<{}> = ({}) => {
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

  return (
    <div className="eight-bit-border-20 bg-blue-dark px-5 md:px-10 pb-5">
      <div>
        <h3 className="text-4xl">PRO</h3>
        <div className="">
          <div className="flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5">
            <Dropdown<Ticker>
              selectedOption={ticker}
              setSelectedOption={setTicker}
              placeHolder="Search Token"
              searchOption={tickerOptions}
              title="&nbsp;Bet on:&nbsp;&nbsp;"
              isSearchable={true}
            />
            <TimePicker<number> title="Duration:" placeHolder="Search Token" />
          </div>

          <div className="flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5">
            <Dropdown<Metric>
              selectedOption={metric}
              setSelectedOption={setMetric}
              placeHolder="Search Metric"
              searchOption={metricOptions}
              title="&nbsp;Metric:&nbsp;&nbsp;"
            />
            <Dropdown<boolean>
              selectedOption={direction}
              setSelectedOption={setDirection}
              placeHolder="Select Direction"
              searchOption={directionOptions}
              title="&nbsp;Direction:"
            />
          </div>
          <div className="flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5">
            <Dropdown<Address>
              selectedOption={currency}
              setSelectedOption={setCurrency}
              placeHolder="Select Currency"
              searchOption={currencyOptions}
              title="&nbsp;Currency:&nbsp;&nbsp;"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetProForm;

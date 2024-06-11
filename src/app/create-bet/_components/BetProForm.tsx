"use client";
import { Metric, Ticker } from "@/app/lib/utils/bets/types";
import {
  currencyOptions,
  directionOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import React from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import Dropdown from "./Dropdown";
import TimePicker from "./TimePicker";
import { Address } from "viem";
import ProBetAmount from "./ProBetAmount";

const BetProForm: React.FC = () => {
  const {
    ticker,
    metric,
    direction,
    currency,
    setTicker,
    setMetric,
    setDirection,
    setCurrency,
  } = useBetContext();

  const commonStyle =
    "flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5";

  return (
    <div className="pixel-art-border-lg-dark bg-prussian-dark px-5 md:px-10 pb-5">
      <div>
        <h3 className="text-4xl">PRO</h3>
        <div className="">
          <div className={commonStyle}>
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

          <div className={commonStyle}>
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
          <div className={commonStyle}>
            <Dropdown<Address>
              selectedOption={currency}
              setSelectedOption={setCurrency}
              placeHolder="Select Currency"
              searchOption={currencyOptions}
              title="&nbsp;Currency:&nbsp;&nbsp;"
            />

            <ProBetAmount<string> title="Amount" placeHolder="Ex: 10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetProForm;

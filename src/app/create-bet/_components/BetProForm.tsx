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
import BetAmount from "../../components/BetAmount";
import PixelArtBorder from "@/app/components/PixelArtBorder";
import { colors } from "../../../../tailwind.config";
import { twMerge } from "tailwind-merge";

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

  return (
    <div className="pixel-art-border-lg-dark bg-prussian-dark px-5 md:px-10 pb-5 w-full max-w-md md:w-auto md:max-w-fit ">
      <div>
        <h3 className="text-4xl">PRO</h3>
        <div className="grid md:grid-cols-2 gap-x-3">
          <Dropdown<Ticker>
            selectedOption={ticker}
            setSelectedOption={setTicker}
            placeHolder="Search Token"
            searchOption={tickerOptions}
            title="&nbsp;Bet on:&nbsp;&nbsp;"
            isSearchable={true}
          />
          <TimePicker<number> title="End at:" placeHolder="End at" />

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
          <Dropdown<Address>
            selectedOption={currency}
            setSelectedOption={setCurrency}
            placeHolder="Select Currency"
            searchOption={currencyOptions}
            title="&nbsp;Currency:&nbsp;&nbsp;"
          />

          <BetAmount<string> title="Amount" placeHolder="Ex: 10" />
        </div>
      </div>
    </div>
  );
};

export default BetProForm;

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

  const commonStyle = "grid grid-cols-2 gap-2 lg:gap-4";

  return (
    <PixelArtBorder
      color={colors.prussian.dark}
      width={20}
      className={twMerge("px-5 md:px-10 pb-5 max-w-md md:w-auto md:max-w-fit")}
    >
      <h3 className="text-4xl">PRO</h3>
      <div className={commonStyle}>
        <Dropdown<Ticker>
          selectedOption={ticker}
          setSelectedOption={setTicker}
          placeHolder="Search Token"
          searchOption={tickerOptions}
          title="&nbsp;Bet on:&nbsp;&nbsp;"
          isSearchable={true}
        />
        <TimePicker<number> title="End at:" placeHolder="End at" />
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

        <BetAmount<string> title="Amount" placeHolder="Ex: 10" />
      </div>
    </PixelArtBorder>
  );
};

export default BetProForm;

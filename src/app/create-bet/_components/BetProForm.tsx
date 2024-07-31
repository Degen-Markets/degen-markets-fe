"use client";
import { Currency, Metric, Ticker } from "@/app/lib/utils/bets/types";
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
import CreateBetButton from "@/app/components/CreateBetButton";
import BetDetail from "./BetDetail";

const BetProForm: React.FC<{ ethPrice: number | null }> = ({ ethPrice }) => {
  const {
    ticker,
    metric,
    direction,
    value,
    currency,
    setTicker,
    setMetric,
    setDirection,
    setCurrency,
  } = useBetContext();

  const isEth = currency.label === Currency.ETH;

  const calculatedValue =
    isEth && ethPrice ? (Number(value) * ethPrice).toLocaleString() : value;

  return (
    <div className="bg-blue-secondary px-5 md:px-10 pb-5 w-full md:w-auto md:max-w-fit rounded-2xl p-4">
      <h3 className="text-4xl uppercase text-center font-bold drop-shadow-text py-2">
        Bull Or Bear
      </h3>
      <div className="grid md:grid-cols-2 gap-x-3 border-t-2 border-black-medium">
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
      <div className="flex flex-col justify-center items-center mt-2">
        <BetDetail ethPrice={ethPrice} calculatedValue={calculatedValue} />
        <CreateBetButton isBetOneUp betType="binary" />
      </div>
    </div>
  );
};

export default BetProForm;

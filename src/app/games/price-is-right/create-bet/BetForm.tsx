import { useBetContext } from "@/app/create-bet/BetContext";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import { Ticker } from "@/app/lib/utils/bets/types";
import { currencyOptions, tickerOptions } from "@/app/lib/utils/bets/constants";
import TimePicker from "@/app/create-bet/_components/TimePicker";
import { Address } from "viem";
import BetAmount from "@/app/components/BetAmount";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  disabled?: boolean;
}

const BetForm: FC<Props> = ({ disabled }) => {
  const {
    ticker,
    metric,
    currency,
    setTicker,
    setCurrency,
    strikePriceCreator,
    setStrikePriceCreator,
  } = useBetContext();

  const formGroupClasses =
    "flex items-start sm:items-center flex-col sm:flex-row space-x-0 sm:space-x-5";
  const containerClasses = twMerge(
    "pixel-art-border-lg-dark bg-prussian-dark px-2 md:px-4 pb-5 pt-12",
    disabled && "opacity-80",
  );
  return (
    <div className={containerClasses}>
      <div className={formGroupClasses}>
        <Dropdown<Ticker>
          selectedOption={ticker}
          setSelectedOption={setTicker}
          placeHolder="Search Token"
          searchOption={tickerOptions}
          title="&nbsp;Bet on:&nbsp;&nbsp;"
          isSearchable={true}
          disabled={disabled}
        />
        <TimePicker<number>
          title="Duration:"
          placeHolder="Search Token"
          disabled={disabled}
        />
      </div>
      <div className={formGroupClasses}>
        <div className="relative w-full sm:w-fit">
          <h4 className="pt-3 text-left whitespace-nowrap">{metric.label}:</h4>
          <input
            disabled={disabled}
            value={disabled ? "XXXX" : strikePriceCreator}
            onChange={(e) => {
              if (!disabled) setStrikePriceCreator(e.target.value.trim());
            }}
            className="px-2 sm:px-4 py-2 sring-purple-medium text-[#000] uppercase w-full sm:w-fit"
            placeholder={metric.label}
          />
        </div>
      </div>
      <div className={formGroupClasses}>
        <Dropdown<Address>
          selectedOption={currency}
          setSelectedOption={setCurrency}
          placeHolder="Select Currency"
          searchOption={currencyOptions}
          title="&nbsp;Currency:&nbsp;&nbsp;"
          disabled={disabled}
        />
        <BetAmount<string>
          title="Amount"
          placeHolder="Ex: 10"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default BetForm;

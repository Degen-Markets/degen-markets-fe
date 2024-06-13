import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Address } from "viem";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import TimePicker from "@/app/create-bet/_components/TimePicker";
import BetAmount from "@/app/components/BetAmount";
import PixelArtBorder from "@/app/components/PixelArtBorder";
import AvatarWithLabel from "@/app/components/AvatarWithLabel";
import { Ticker } from "@/app/lib/utils/bets/types";
import { currencyOptions, tickerOptions } from "@/app/lib/utils/bets/constants";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { colors } from "../../../../../tailwind.config";

interface Props {
  disabled?: boolean;
  address?: Address;
}

const BetForm: FC<Props> = ({ disabled, address }) => {
  const {
    ticker,
    metric,
    currency,
    setTicker,
    setCurrency,
    strikePriceCreator,
    setStrikePriceCreator,
  } = useBetContext();

  const displayName = address
    ? getDisplayNameForAddress(address)
    : "Mystery Opponent.";

  const formGroupClasses = "grid grid-cols-2 gap-6";
  const betCardClasses = twMerge("p-4 pt-16 z-1", disabled && "opacity-80");

  return (
    <div>
      <AvatarWithLabel
        address={address}
        label={displayName}
        className="translate-y-1/2 z-50"
      />
      <PixelArtBorder
        color={colors.prussian.dark}
        width={20}
        className={betCardClasses}
      >
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
          <div className="relative">
            <h4 className="pt-3 text-left whitespace-nowrap">Metric:</h4>
            <input
              disabled={true}
              value="Price"
              className="px-2 sm:px-4 py-2 sring-purple-medium text-[#000] uppercase"
              placeholder="Price"
            />
          </div>
          <div className="relative">
            <h4 className="pt-3 text-left whitespace-nowrap">
              {metric.label}:
            </h4>
            <input
              disabled={disabled}
              value={disabled ? "XXXX" : strikePriceCreator}
              onChange={(e) => {
                if (!disabled) setStrikePriceCreator(e.target.value.trim());
              }}
              className="px-2 sm:px-4 py-2 sring-purple-medium text-[#000] uppercase"
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
      </PixelArtBorder>
    </div>
  );
};

export default BetForm;

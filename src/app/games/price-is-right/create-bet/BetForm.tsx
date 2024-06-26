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
  formType: "creator" | "acceptor";
}

const BetForm: FC<Props> = ({ disabled, address, formType }) => {
  const {
    ticker,
    currency,
    strikePriceCreator,
    setTicker,
    setCurrency,
    setStrikePriceCreator,
    setStrikePriceAcceptor,
  } = useBetContext();

  const displayName = address
    ? getDisplayNameForAddress(address)
    : "Mystery Opponent.";

  const formGroupClasses = "grid grid-cols-2 gap-2 lg:gap-4";
  return (
    <div className={"-mt-12 lg:-mt-8"}>
      <AvatarWithLabel
        address={address}
        label={displayName}
        className="translate-y-1/2 z-50"
      />
      <PixelArtBorder
        color={colors.prussian.dark}
        width={20}
        className={twMerge("p-4 pt-16 z-1")}
      >
        <div className={formGroupClasses}>
          <Dropdown<Ticker>
            selectedOption={ticker}
            setSelectedOption={setTicker}
            placeHolder="End at"
            searchOption={tickerOptions}
            title="&nbsp;Bet on:&nbsp;&nbsp;"
            isSearchable={true}
            disabled={disabled}
          />
          <TimePicker<number>
            title="End at:"
            placeHolder="End at"
            disabled={disabled}
          />
        </div>
        <div className={formGroupClasses}>
          <div className="flex flex-col">
            <h4 className="pt-3 text-left whitespace-nowrap">Metric:</h4>
            <input
              disabled={true}
              value="Price"
              className="p-2 sring-purple-medium text-black uppercase "
              placeholder="Price"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="pt-3 text-left whitespace-nowrap"> Price guess:</h4>
            <input
              disabled={formType === "acceptor"}
              value={formType === "creator" ? strikePriceCreator : "XXXXX"}
              onChange={(e) => {
                const value = e.target.value.trim();
                if (formType === "creator") {
                  setStrikePriceCreator(value);
                } else {
                  setStrikePriceAcceptor(value);
                }
              }}
              className="p-2 sring-purple-medium text-black] uppercase "
              placeholder="Price guess"
              type="number"
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

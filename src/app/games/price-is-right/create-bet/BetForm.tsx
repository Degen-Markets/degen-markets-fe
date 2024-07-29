import { ChangeEvent, FC } from "react";
import { twMerge } from "tailwind-merge";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Address } from "viem";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import TimePicker from "@/app/create-bet/_components/TimePicker";
import BetAmount from "@/app/components/BetAmount";
import { Ticker } from "@/app/lib/utils/bets/types";
import { currencyOptions, tickerOptions } from "@/app/lib/utils/bets/constants";

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
    setError,
    validateFields,
  } = useBetContext();

  const formGroupClasses = "grid grid-cols-2 gap-2 lg:gap-4";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    const numericValue = Number(inputValue);
    setError(
      numericValue <= 0 || isNaN(numericValue)
        ? "Please enter a guess price!"
        : "",
    );

    const stringValue =
      numericValue <= 0 || isNaN(numericValue) ? "" : String(numericValue);

    if (formType === "creator") {
      setStrikePriceCreator(stringValue);
    } else {
      setStrikePriceAcceptor(stringValue);
    }
    validateFields();
  };

  return (
    <div className={twMerge("p-4 text-base")}>
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
          <label className="pt-3 text-left whitespace-nowrap font-bold">
            Metric:
          </label>
          <input
            disabled={true}
            value="Price"
            className="p-2 ring-purple-medium text-black-medium uppercase rounded-md"
            placeholder="Price"
          />
        </div>
        <div className="flex flex-col">
          <label className="pt-3 text-left whitespace-nowrap font-bold">
            {" "}
            Price guess:
          </label>
          <input
            disabled={formType === "acceptor"}
            value={formType === "creator" ? strikePriceCreator : "XXXXX"}
            onChange={handleInputChange}
            className="p-2 sring-purple-medium text-black-main rounded-md uppercase"
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
    </div>
  );
};

export default BetForm;

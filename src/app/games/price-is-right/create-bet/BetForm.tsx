import { ChangeEvent, FC } from "react";
import { twMerge } from "tailwind-merge";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Address } from "viem";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import TimePicker from "@/app/create-bet/_components/TimePicker";
import BetAmount from "@/app/components/BetAmount";
import Input from "@/app/components/Input";
import { BetComponentProps } from "@/app/lib/utils/bets/types";
import { currencyOptions } from "@/app/lib/utils/bets/constants";
import PrettySearch from "@/app/components/TokenSearch/PrettySearch";

interface Props {
  disabled?: boolean;
  address?: Address;
  formType: "creator" | "acceptor";
  tickerCmcResponse: BetComponentProps["tickerCmcResponse"];
}

const BetForm: FC<Props> = ({ disabled, formType, tickerCmcResponse }) => {
  const {
    currency,
    strikePriceCreator,
    setCurrency,
    setStrikePriceCreator,
    setStrikePriceAcceptor,
    setError,
    validateFields,
  } = useBetContext();

  const formGroupClasses = "grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    const numericValue = Number(inputValue);

    const error =
      numericValue <= 0 || isNaN(numericValue)
        ? "Please enter a guess price!"
        : "";
    setError(error);

    const stringValue = error ? "" : String(numericValue);

    if (formType === "creator") {
      setStrikePriceCreator(stringValue);
    } else {
      setStrikePriceAcceptor(stringValue);
    }
    validateFields();
  };

  return (
    <div className={twMerge("p-4 text-base space-y-2 lg:space-y-4")}>
      <div className={formGroupClasses}>
        <PrettySearch tickerCmcResponse={tickerCmcResponse} />
        <TimePicker<number>
          title="End at:"
          placeHolder="End at"
          disabled={disabled}
        />
      </div>
      <div className={formGroupClasses}>
        <Input
          label="Metric:"
          disabled
          value="Price"
          placeholder="Price"
          className="text-black-medium"
        />
        <Input
          label="Price guess:"
          disabled={formType === "acceptor"}
          value={formType === "creator" ? strikePriceCreator : "XXXXX"}
          onChange={handleInputChange}
          placeholder="Price guess"
          type="number"
          className="text-black-main"
        />
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

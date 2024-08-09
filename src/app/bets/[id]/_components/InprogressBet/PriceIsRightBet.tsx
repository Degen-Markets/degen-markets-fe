import React, { FC, useState, useCallback, useEffect } from "react";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import FormInput from "@/app/components/FormInput";
import { BetResponse, Address } from "@/app/lib/utils/bets/types";
import getCurrencyByAddress from "@/app/lib/getCurrencyByAddress";
import formatDateTime from "@/app/lib/utils/formatDateTime";
import formattedValueToDisplay from "@/app/lib/utils/formattedValueToDisplay";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";

interface PriceIsRightBetFormProps {
  type: "creator" | "acceptor";
  address?: Address;
  strikePriceAcceptor: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bet: BetResponse;
}

const PriceIsRightBetForm: FC<PriceIsRightBetFormProps> = ({
  type,
  address,
  strikePriceAcceptor,
  onChange,
  bet,
}) => {
  const currency = getCurrencyByAddress(bet.currency) || "";

  const valueToDisplay = formattedValueToDisplay(bet.value, bet.currency);
  const endAt = formatDateTime(new Date(Number(bet.creationTimestamp) * 1000));

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormInput label="Bet on:" value={bet.ticker} disabled />
        <FormInput label="End at:" value={endAt} disabled />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput label="Metric:" value="Price" disabled />
        <FormInput
          label="Price guess:"
          value={
            type === "creator"
              ? bet.strikePriceCreator || ""
              : strikePriceAcceptor
          }
          disabled={type === "creator"}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          placeholder="Price"
          type="number"
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput label="Currency:" value={currency} disabled />
        <FormInput label="Amount:" value={valueToDisplay.toString()} disabled />
      </div>
    </>
  );
};

interface Props {
  bet: BetResponse;
  address?: Address;
}

const PriceIsRightBet: FC<Props> = ({ bet, address }) => {
  const isCreatedByCurrentUser =
    bet.creator.toLowerCase() === (address?.toLowerCase() || "");
  const [error, setError] = useState("");
  const [localStrikePriceAcceptor, setLocalStrikePriceAcceptor] = useState("");

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.trim();
      const numericValue = Number(inputValue);
      const stringValue =
        numericValue <= 0 || isNaN(numericValue) ? "" : String(numericValue);

      setError(
        numericValue <= 0 || isNaN(numericValue)
          ? "Please enter a guess price!"
          : "",
      );
      setLocalStrikePriceAcceptor(stringValue);
    },
    [],
  );

  useEffect(() => {
    if (!localStrikePriceAcceptor) {
      setError("Please enter a valid guess price!");
    }
  }, [localStrikePriceAcceptor]);

  return (
    <div className="grid grid-cols-5 gap-8 mt-8 lg:mt-18">
      <div className="col-span-5 lg:col-span-3 lg:pl-[15%]">
        <div className="bg-blue-secondary px-5 md:px-10 pb-5 w-full md:w-auto md:max-w-fit rounded-2xl p-4">
          <h3 className="text-4xl uppercase text-center font-bold drop-shadow-text py-2 mb-2">
            The Price Is Right
          </h3>
          <div className="bg-black-medium border border-white rounded-lg p-4 md:p-8 space-y-4">
            <PriceIsRightBetForm
              bet={bet}
              type="acceptor"
              address={address}
              strikePriceAcceptor={localStrikePriceAcceptor}
              onChange={handlePriceChange}
            />
            {!isCreatedByCurrentUser && (
              <div className="flex items-center justify-center">
                <AcceptBetButton
                  bet={bet}
                  address={address}
                  className="mt-8"
                  strikePriceAcceptor={localStrikePriceAcceptor}
                  error={error}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-2">
        <RecentActivity />
      </div>
    </div>
  );
};

export default PriceIsRightBet;

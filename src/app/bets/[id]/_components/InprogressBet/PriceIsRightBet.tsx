import React, { FC, useState, useCallback, useEffect } from "react";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import AvatarWithLabel from "@/app/components/AvatarWithLabel";
import PixelArtBorder from "@/app/components/PixelArtBorder";
import FormInput from "@/app/components/FormInput";
import { colors } from "../../../../../../tailwind.config";
import { BetResponse, Address, Currency } from "@/app/lib/utils/bets/types";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import getCurrencyByAddress from "@/app/lib/getCurrencyByAddress";
import { formatUnits } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";
import formatDateTime from "@/app/lib/utils/formatDateTime";

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
  const displayName = address
    ? getDisplayNameForAddress(address)
    : "Mystery Opponent";
  const currency = getCurrencyByAddress(bet.currency) || "";
  const isEth = currency === Currency.ETH;

  const formattedValueToDisplay = formatUnits(
    BigInt(bet.value),
    isEth ? 18 : STABLECOIN_DECIMALS,
  );
  const endAt = formatDateTime(new Date(Number(bet.creationTimestamp) * 1000));

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
        className="p-4 pt-16 z-1"
      >
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
          <FormInput
            label="Amount:"
            value={formattedValueToDisplay.toString()}
            disabled
          />
        </div>
      </PixelArtBorder>
    </div>
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
    <div className="flex gap-8">
      <div className="flex flex-col items-center">
        <PriceIsRightBetForm
          bet={bet}
          type="creator"
          address={bet.creator}
          strikePriceAcceptor={localStrikePriceAcceptor}
        />
      </div>
      <div className="hidden md:flex items-center text-8xl">
        <span className="translate-y-1/2">VS</span>
      </div>
      <div className="flex flex-col items-center">
        <PriceIsRightBetForm
          bet={bet}
          type="acceptor"
          address={address}
          strikePriceAcceptor={localStrikePriceAcceptor}
          onChange={handlePriceChange}
        />
        {!isCreatedByCurrentUser && (
          <AcceptBetButton
            bet={bet}
            address={address}
            className="mt-8"
            strikePriceAcceptor={localStrikePriceAcceptor}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default PriceIsRightBet;

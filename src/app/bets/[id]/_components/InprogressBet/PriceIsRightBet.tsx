import React, { FC, useState } from "react";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import AvatarWithLabel from "@/app/components/AvatarWithLabel";
import { colors } from "../../../../../../tailwind.config";
import PixelArtBorder from "@/app/components/PixelArtBorder";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { twMerge } from "tailwind-merge";

interface Props {
  bet: BetResponse;
  address?: Address;
}

const PriceIsRightBet: FC<Props> = ({ bet, address }) => {
  const isCreatedByCurrentUser =
    bet.creator.toLowerCase() === address?.toLowerCase();

  const styles = {
    headline: "text-4xl lg:text-8xl text-white text-center",
    betFormContainer: "flex flex-col items-center",
    vsText: "flex items-center text-8xl",
    formWrapper: "flex gap-8",
  };

  const [localStrikePriceAcceptor, setLocalStrikePriceAcceptor] = useState("");

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "creator" | "acceptor",
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (type === "acceptor") {
        setLocalStrikePriceAcceptor(value);
      }
    }
  };

  const PriceIsRightBetForm = ({
    type,
    address,
  }: {
    type: "creator" | "acceptor";
    address?: Address;
    isDisabled?: boolean;
  }) => {
    const displayName = address
      ? getDisplayNameForAddress(address)
      : "Mystery Opponent";
    const formGroupClasses = "grid grid-cols-2 gap-6";
    const betCardClasses = twMerge("p-4 pt-16 z-1");

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
            <FormInput label="Bet on:" value={bet.ticker} disabled />
            <FormInput
              label="Duration:"
              value={bet.creationTimestamp}
              disabled
            />
          </div>
          <div className={formGroupClasses}>
            <FormInput label="Metric:" value="Price" disabled />
            <FormInput
              label="Price guess:"
              value={
                type === "creator"
                  ? bet.strikePriceCreator || ""
                  : localStrikePriceAcceptor
              }
              disabled={type === "creator"}
              onChange={(e) => handlePriceChange(e, type)}
              placeholder="Price"
            />
          </div>
          <div className={formGroupClasses}>
            <FormInput label="Currency:" value={bet.currency} disabled />
            <FormInput label="Amount:" value={bet.value} disabled />
          </div>
        </PixelArtBorder>
      </div>
    );
  };

  const FormInput = ({
    label,
    value,
    disabled,
    onChange,
    placeholder,
  }: {
    label: string;
    value: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className="relative">
        <h4 className="pt-3 text-left whitespace-nowrap">{label}</h4>
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          className="px-2 sm:px-4 py-2 sring-purple-medium text-[#000] uppercase"
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.betFormContainer}>
        <PriceIsRightBetForm type="creator" isDisabled address={bet.creator} />
      </div>
      <div className={styles.vsText}>
        <span className="translate-y-1/2">VS</span>
      </div>
      <div className={styles.betFormContainer}>
        <PriceIsRightBetForm type="acceptor" address={address} />
        {!isCreatedByCurrentUser && (
          <AcceptBetButton
            bet={bet}
            address={address}
            className="mt-8"
            strikePriceAcceptor={localStrikePriceAcceptor}
          />
        )}
      </div>
    </div>
  );
};

export default PriceIsRightBet;

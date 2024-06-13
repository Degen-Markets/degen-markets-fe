import React, { FC } from "react";
import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";

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

  return (
    <div className={styles.formWrapper}>
      <div className={styles.betFormContainer}>
        <BetForm address={bet.creator} disabled />
      </div>
      <div className={styles.vsText}>
        <span className="translate-y-1/2">VS</span>
      </div>
      <div className={styles.betFormContainer}>
        <BetForm address={address} />
        {!isCreatedByCurrentUser && (
          <AcceptBetButton bet={bet} address={address} className="mt-8" />
        )}
      </div>
    </div>
  );
};

export default PriceIsRightBet;

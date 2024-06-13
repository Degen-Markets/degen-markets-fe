import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import CreateBetButton from "@/app/components/CreateBetButton";
import React, { FC } from "react";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}
const BinaryBet: FC<Props> = ({ bet, address }) => {
  const styles = {
    headline: "text-4xl lg:text-8xl text-white text-center",
    betFormContainer: "flex flex-col items-center",
    vsText: "flex items-center text-8xl ",
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
        <CreateBetButton betType="closest-guess-wins" className="mt-8" />
      </div>
    </div>
  );
};

export default BinaryBet;

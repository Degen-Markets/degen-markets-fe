import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import CreateBetButton from "@/app/components/CreateBetButton";
import React, { FC } from "react";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import AvatarWithLabel from "@/app/components/AvatarWithLabel";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}
const BinaryBet: FC<Props> = ({ bet, address }) => {
  const styles = {
    layout: "md:mx-auto lg:max-w-screen-xl text-center space-y-12",
    headline:
      "pixel-art-border-sm-dark lg:pixel-art-border-lg-dark bg-prussian-dark text-4xl lg:text-8xl w-fit px-8",
    betFormContainer: "flex flex-col items-center",
    avatarWrapper: "flex items-center flex-col translate-y-1/2 z-10",
    vsText: "flex items-center text-8xl ",
    formWrapper: "flex gap-8",
  };

  const creatorDisplayName = address
    ? getDisplayNameForAddress(bet.creator)
    : "Loading...";
  const acceptorDisplayName = address
    ? getDisplayNameForAddress(address)
    : "Loading...";

  return (
    <div className={styles.formWrapper}>
      <div className={styles.betFormContainer}>
        <AvatarWithLabel address={bet.creator} label={creatorDisplayName} />
        <BetForm disabled />
      </div>
      <div className={styles.vsText}>
        <span className="translate-y-1/2">VS</span>
      </div>
      <div className={styles.betFormContainer}>
        <AvatarWithLabel address={address} label={acceptorDisplayName} />
        <BetForm />
        <CreateBetButton betType="closest-guess-wins" className="mt-8" />
      </div>
    </div>
  );
};

export default BinaryBet;

"use client";

import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import { useAccount } from "wagmi";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import CreateBetButton from "@/app/components/CreateBetButton";
import { BetProvider } from "@/app/create-bet/BetContext";
import Wrapper from "@/app/components/Wrapper";
import AvatarWithLabel from "@/app/components/AvatarWithLabel";

const styles = {
  layout: "md:mx-auto lg:max-w-screen-xl text-center space-y-12",
  headline:
    "pixel-art-border-sm-dark lg:pixel-art-border-lg-dark bg-prussian-dark text-4xl lg:text-8xl w-fit px-8",
  betFormContainer: "flex flex-col items-center",
  vsText: "flex items-center text-8xl ",
  formWrapper: "flex gap-8",
};

const CreateBetPage = () => {
  const { address } = useAccount();
  const displayName = address
    ? getDisplayNameForAddress(address)
    : "Loading...";

  return (
    <BetProvider>
      <Wrapper className={styles.layout}>
        <h2 className={styles.headline}>Price is Right</h2>
        <div className={styles.formWrapper}>
          <div className={styles.betFormContainer}>
            <AvatarWithLabel address={address} label={displayName} />
            <BetForm />
            <CreateBetButton betType="closest-guess-wins" className="mt-8" />
          </div>
          <div className={styles.vsText}>
            <span className="translate-y-1/2">VS</span>
          </div>
          <div className={styles.betFormContainer}>
            <AvatarWithLabel label="Mystery Opponent" />
            <BetForm disabled />
          </div>
        </div>
      </Wrapper>
    </BetProvider>
  );
};

export default CreateBetPage;

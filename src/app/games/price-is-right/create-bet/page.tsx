"use client";

import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import { useAccount } from "wagmi";
import CreateBetButton from "@/app/components/CreateBetButton";
import { BetProvider } from "@/app/create-bet/BetContext";
import Wrapper from "@/app/components/Wrapper";
import { Suspense } from "react";

const styles = {
  headline: "text-4xl lg:text-8xl text-white text-center",
  betFormContainer: "flex flex-col items-center",
  vsText: "flex items-center text-8xl ",
  formWrapper: "flex gap-8",
};

const CreateBetPage = () => {
  const { address } = useAccount();
  return (
    <Suspense>
      <BetProvider>
        <Wrapper>
          <h2 className={styles.headline}>Price is Right</h2>
          <div className={styles.formWrapper}>
            <div className={styles.betFormContainer}>
              <BetForm address={address} formType="creator" />
              <CreateBetButton betType="closest-guess-wins" className="mt-8" />
            </div>
            <div className={styles.vsText}>
              <span className="translate-y-1/2">VS</span>
            </div>
            <div className={styles.betFormContainer}>
              <BetForm disabled formType="acceptor" />
            </div>
          </div>
        </Wrapper>
      </BetProvider>
    </Suspense>
  );
};

export default CreateBetPage;

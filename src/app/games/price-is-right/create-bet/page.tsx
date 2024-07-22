"use client";

import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import { useAccount } from "wagmi";
import CreateBetButton from "@/app/components/CreateBetButton";
import { BetProvider } from "@/app/create-bet/BetContext";
import { Suspense } from "react";
import BetLayout from "@/app/layouts/BetLayout";
import { twMerge } from "tailwind-merge";

const styles = {
  headline: "text-4xl lg:text-8xl text-white text-center",
  betFormContainer: "flex flex-col items-center px-2 lg:px-0",
  vsText: "items-center text-8xl hidden lg:flex",
  formWrapper: "flex gap-8",
};

const CreateBetPage = () => {
  const { address } = useAccount();
  return (
    <Suspense>
      <BetProvider>
        <BetLayout className="lg:max-w-screen-xl flex flex-col items-center">
          <h2 className={styles.headline}>The Price is Right</h2>
          <div className={styles.formWrapper}>
            <div className={styles.betFormContainer}>
              <BetForm address={address} formType="creator" />
              <CreateBetButton betType="closest-guess-wins" className="mt-8" />
            </div>
            <div className={styles.vsText}>
              <span className="translate-y-1/2">VS</span>
            </div>
            <div className={twMerge(styles.betFormContainer, "hidden lg:flex")}>
              <BetForm disabled formType="acceptor" />
            </div>
          </div>
        </BetLayout>
      </BetProvider>
    </Suspense>
  );
};

export default CreateBetPage;

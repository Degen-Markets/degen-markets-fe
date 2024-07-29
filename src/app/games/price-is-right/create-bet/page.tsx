"use client";

import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import { useAccount } from "wagmi";
import CreateBetButton from "@/app/components/CreateBetButton";
import { BetProvider } from "@/app/create-bet/BetContext";
import React, { Suspense } from "react";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import Wrapper from "@/app/components/Wrapper";

const CreateBetPage = () => {
  const { address } = useAccount();
  return (
    <Suspense>
      <BetProvider>
        <Wrapper>
          <div className="grid grid-cols-2 gap-8 mt-18">
            <div>
              <div className="bg-blue-secondary px-5 md:px-10 pb-5 w-full md:w-auto md:max-w-fit rounded-2xl p-4">
                <h3 className="text-4xl uppercase text-center font-bold drop-shadow-text py-2">
                  The Price Is Right
                </h3>
                <div className="bg-black-medium border border-white rounded-lg">
                  <BetForm address={address} formType="creator" />
                  <CreateBetButton
                    isBetOneUp
                    betType="closest-guess-wins"
                    className="mt-8"
                  />
                </div>
              </div>
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </Wrapper>
      </BetProvider>
    </Suspense>
  );
};

export default CreateBetPage;

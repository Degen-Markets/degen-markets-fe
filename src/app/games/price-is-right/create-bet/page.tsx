"use client";

import BetForm from "@/app/games/price-is-right/create-bet/BetForm";
import { useAccount } from "wagmi";
import CreateBetButton from "@/app/components/CreateBetButton";
import { BetProvider } from "@/app/create-bet/BetContext";
import { Suspense } from "react";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import Wrapper from "@/app/components/Wrapper";

const CreateBetPage = () => {
  const { address } = useAccount();
  return (
    <Suspense>
      <BetProvider>
        <Wrapper className="max-w-screen-xl">
          <div className="grid grid-cols-5 gap-8 mt-8 lg:mt-18">
            <div className="col-span-5 lg:col-span-3 lg:pl-[25%]">
              <div className="bg-blue-secondary px-5 md:px-10 pb-5 w-full md:w-auto md:max-w-fit rounded-2xl p-4">
                <h3 className="text-4xl uppercase text-center font-bold drop-shadow-text py-2 mb-2">
                  The Price Is Right
                </h3>
                <div className="bg-black-medium border border-white rounded-lg p-8 space-y-4">
                  <BetForm address={address} formType="creator" />
                  <CreateBetButton isBetOneUp betType="closest-guess-wins" />
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2">
              <RecentActivity />
            </div>
          </div>
        </Wrapper>
      </BetProvider>
    </Suspense>
  );
};

export default CreateBetPage;

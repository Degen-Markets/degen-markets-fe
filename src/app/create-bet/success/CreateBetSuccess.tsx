"use client";

import { BET_ACCEPTANCE_TIME_LIMIT } from "@/app/lib/utils/bets/constants";
import { useSearchParams } from "next/navigation";
import BetCountdown from "@/app/components/BetCoundown";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import shareContent from "@/app/lib/utils/shareContent";
import { useEffect, useState } from "react";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { Button, ButtonGradient } from "@/app/components/Button";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import Link from "next/link";
import ActivityRow from "@/app/components/RecentActivity/ActivityRow";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import GradientText from "@/app/components/WalletMenu/GradientText";
import PixelArtLoader from "@/app/components/PixelArtLoading";

const CreateBetSuccess = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [bet, setBet] = useState<BetResponse | null>(null);

  useEffect(() => {
    const fetchBet = async () => {
      if (!!id) {
        try {
          const { data: fetchedBet } = await getBetById(id);
          setBet(fetchedBet);
        } catch (error) {
          console.error("Error fetching bet:", error);
        }
      }
    };
    fetchBet();
  }, [id]);
  const creationTimestamp = bet?.creationTimestamp;
  const ticker = bet?.ticker || "";
  const metric = bet?.metric || "";
  const direction = bet?.isBetOnUp === true ? "up" : "down";
  const betType =
    bet?.type === "binary" ? "Bull or Bear" : "The Price is Right";

  const handleShare = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/bets/${id}`;
    shareContent("Check out my bet!", "I just made a bet! Check it out:", url);
  };

  const handleCopy = async () => {
    const url = `${window.location.protocol}//${window.location.hostname}/bets/${id}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <div className="flex-col md:flex-row flex justify-center items-center md:items-start w-full max-w-7xl mx-auto lg:gap-5">
      <div>
        <div className="text-center">
          <Heading>
            <Headline>{betType}</Headline>
          </Heading>
          <div className="mb-10">
            {!!bet ? (
              <div className="border rounded-xl">
                {" "}
                <ActivityRow bet={bet as BetResponse} />
              </div>
            ) : (
              <div className="text-white drop-shadow-text p-8 border rounded-xl flex justify-center items-center uppercase">
                <PixelArtLoader
                  text="Loading..."
                  loaderColor="bg-white"
                  textColor="text-white"
                />
              </div>
            )}
            {creationTimestamp && (
              <SubHeadline className="border-t-0 rounded-t-none" isTop={false}>
                <BetCountdown
                  classNames="!text-sm"
                  expirationTimestampInS={
                    Number(creationTimestamp) + BET_ACCEPTANCE_TIME_LIMIT
                  }
                />
              </SubHeadline>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mt-16">
          <GradientText className="text-center font-bold leading-snug ">
            Your bet on <span className="text-white">{ticker}&apos;s </span>
            {metric} going {direction} was successfully created! Challenge your
            frens by giving them a link to this bet. They have
            <span className="text-white"> 4 hours </span>
            to accept!
          </GradientText>
          <div className="flex gap-6">
            <Link href={`/bets/${id}?betType=${bet?.type}`}>
              <Button
                size="regular"
                className="rounded-xl border-2"
                onClick={handleCopy}
              >
                View bet
                <IoEyeSharp className="ml-2" />
              </Button>
            </Link>
            <Button
              size="regular"
              className="rounded-xl bg-gradient-to-r from-cadet-blue-dark to- bg-cadet-blue-light border-2"
              onClick={handleShare}
            >
              Share
              <IoMdShareAlt className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-full max-w-xl mt-5 overflow-y-auto md:sticky md:top-10 mx-4">
        <RecentActivity />
      </div>
    </div>
  );
};
export default CreateBetSuccess;

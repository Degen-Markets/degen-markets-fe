"use client";
import React, { useState } from "react";
import Pagination from "../Pagination";
import { BsFillPieChartFill } from "react-icons/bs";
import { RiBankFill } from "react-icons/ri";
import { FaMicrosoft, FaSquareXTwitter } from "react-icons/fa6";
import { Button } from "../Button";
import Image from "next/image";
import { CardHeading } from "../Card";
import { PoolsResponse } from "@/app/lib/utils/bets/types";

const Landing = ({ pools }: { pools: PoolsResponse }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 9;
  const totalPages = Math.ceil(pools.length / poolsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedPools = pools.slice(
    (currentPage - 1) * poolsPerPage,
    currentPage * poolsPerPage,
  );

  const placeholders = Array.from({
    length: poolsPerPage - displayedPools.length,
  });

  return (
    <div className="my-20 bg-gradient-to-t from-[#AB9FF1] to-[#202B38] pb-40">
      <div className="w-full max-w-6xl mx-auto text-center space-y-10">
        <h1 className="text-5xl md:text-[90px] font-bold leading-none">
          Decentralized Prediction Markets on Solana
        </h1>
        <p className="w-full max-w-4xl mx-auto font-semibold leading-relaxed">
          Make Predictions on Narrative-Driven Events Directly via Twitter.
          Predict Now to Claim YOUR Share of the $306,000 $DGM AirDrop
        </p>
      </div>
      <div className="w-full px-3 max-w-7xl mx-auto mt-20">
        <div className="flex items-center space-x-2 mb-5 uppercase font-bold">
          <BsFillPieChartFill size={30} />
          <span className="text-2xl md:text-4xl">Pools</span>
        </div>
        <div
          className="bg-black-medium bg-opacity-90 p-10 bg-no-repeat bg-contain bg-center rounded-xl py-10 mb-20"
          style={{ backgroundImage: "url(/Lending-Flow.svg)" }}
        >
          <div className="uppercase flex justify-between items-center w-full border-b border-cadet-blue-light pb-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FaMicrosoft className="rounded-lg" />
                <span className="drop-shadow-lightText font-bold">ALL</span>
              </div>
              <div className="flex items-center space-x-1">
                <RiBankFill size={28} className="rounded-lg" />
                <span className="drop-shadow-lightText font-bold">
                  Elections
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="drop-shadow-lightText font-bold">View on</span>
              <FaSquareXTwitter />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full place-items-center place-content-center my-20">
            {displayedPools.map((pool) => (
              <div
                className="z-1 group relative w-full h-60 bg-blue-light rounded-xl center-all text-center p-4 bg-cover bg-center bg-opacity-50 bg-no-repeat hover:scale-105 hover:shadow transition-all ease duration-300"
                style={{
                  backgroundImage: `url('${pool?.image}')`,
                }}
                key={pool.id}
              >
                <div className="absolute inset-0 bg-black-main bg-opacity-70 group-hover:bg-opacity-0 rounded-xl -z-1 transition-all ease duration-300" />
                <div className="z-10">
                  <h2 className="font-bold group-hover:opacity-0 transition-all ease duration-300">
                    {pool.title}
                  </h2>
                  <Button
                    size="regular"
                    className="bg-opacity-90 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all ease duration-300"
                  >
                    Bet Now
                  </Button>
                </div>
              </div>
            ))}
            {placeholders.map((_, ind) => (
              <div
                className="w-full h-60 bg-blue-light text-5xl text-cadet-blue-light cursor-default font-bold flex justify-center items-center bg-opacity-50 rounded-xl"
                key={ind}
              >
                D
              </div>
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="grid grid-cols-12 gap-20">
          <div className="col-span-7">
            <div>
              <div className="flex items-center space-x-2 ml-5">
                <CardHeading
                  icon={
                    <Image
                      src={"/navIcons/leaderBoard.svg"}
                      alt="LeaderBoard"
                      width={35}
                      height={35}
                    />
                  }
                  showBordered={false}
                  className="uppercase"
                >
                  LeaderBoard
                </CardHeading>
              </div>
              <div className="bg-black-medium bg-opacity-90 p-10 rounded-xl py-10 h-full min-h-96">
                TOp Bets
              </div>
            </div>
          </div>
          <div className="col-span-5">
            <div>
              <CardHeading showBordered={false} className="uppercase">
                Social
              </CardHeading>

              <div className="bg-black-medium bg-opacity-90 p-10 rounded-xl py-10 h-full min-h-96">
                Twitters
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

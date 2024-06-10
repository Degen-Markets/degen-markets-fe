"use client";
import { TopToken } from "@/app/lib/utils/bets/types";
import Image from "next/image";
import React from "react";

const TopTokenList = ({ tickers }: { tickers: TopToken[] }) => {
  return (
    <div className="flex flex-col w-full items-start p-3 pt-0 pr-2">
      <div className="w-full h-full">
        <div className="text-5xl uppercase pb-4 lg:whitespace-nowrap">
          TOP Traded Tokens
        </div>
        <div className="flex flex-col gap-y-2 bg-white text-prussian-dark p-2 space-y-2 mt-3">
          <div className="grid grid-cols-3 pr-2">
            <div className=" col-span-2">Tokens</div>
            <div className="col-span-1 whitespace-nowrap text-right">Bets</div>
          </div>
          {tickers.map(({ ticker, betCount }) => {
            return (
              <div className="grid grid-cols-3" key={`${ticker}`}>
                <div className="col-span-2 flex space-x-2 items-center">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center">
                    <Image
                      src={`/tokens/${ticker}.svg`}
                      width={40}
                      height={40}
                      alt={ticker}
                    />
                  </div>
                  <p>{ticker}</p>
                </div>

                <p className="col-span-1 text-right pr-2">{betCount}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopTokenList;

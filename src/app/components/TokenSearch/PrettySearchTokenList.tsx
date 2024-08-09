import { formatNumberToSignificantDigits } from "@/app/lib/utils/bets/helpers";
import { TickerCmcApiData } from "@/app/lib/utils/bets/types";
import Image from "next/image";
import React from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

const PrettySearchTokenList = ({ tokens }: { tokens: TickerCmcApiData[] }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {tokens.map((token) => {
        const { price = 0, volume_change_24h } = token.quote.USD;
        const symbol = token.symbol;

        return (
          <div className="bg-white p-3 rounded-xl" key={symbol}>
            <div className="flex items-center mb-1 space-x-1">
              <Image
                src={`/tokens/${symbol}.svg`}
                width={30}
                height={30}
                alt={symbol}
              />
              <span className="text-black-main font-bold text-xl md:text-lg">
                {symbol}
              </span>
            </div>
            <div className="text-black-main font-bold text-xl">
              ${formatNumberToSignificantDigits(price)}
            </div>
            <div
              className={twMerge(
                volume_change_24h > 0 ? "text-green-light" : "text-red-light",
                "flex items-center space-x-1 text-lg",
              )}
            >
              <TbTriangleFilled />
              <span className="font-bold">{volume_change_24h}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrettySearchTokenList;

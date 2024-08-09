import { formatNumberToSignificantDigits } from "@/app/lib/utils/bets/helpers";
import {
  PrettySearchProps,
  ReelOption,
  Ticker,
  TickerCmcApiData,
} from "@/app/lib/utils/bets/types";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

const PrettySearchPopularToken: FC<PrettySearchProps<TickerCmcApiData[]>> = ({
  data,
  setTicker,
  setPrettySearch,
}) => {
  const handleTickerSelect = (token: TickerCmcApiData) => {
    setTicker({ label: token.symbol, value: token.symbol as Ticker });
    setPrettySearch(false);
  };
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {data.map((token) => {
        const { price = 0, volume_change_24h: percent_change_24h } =
          token.quote.USD;
        const symbol = token.symbol;

        return (
          <div
            className="bg-white p-3 rounded-xl cursor-pointer"
            key={symbol}
            onClick={() => {
              handleTickerSelect(token);
            }}
          >
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
                percent_change_24h > 0 ? "text-green-light" : "text-red-light",
                "flex items-center space-x-1 text-lg",
              )}
            >
              <TbTriangleFilled />
              <span className="font-bold">{percent_change_24h}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrettySearchPopularToken;

import { formatNumberToSignificantDigits } from "@/app/lib/utils/bets/helpers";
import {
  PrettySearchProps,
  Ticker,
  TickerCmcApiData,
} from "@/app/lib/utils/bets/types";
import Image from "next/image";
import { FC } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

const PrettySearchPopularToken: FC<PrettySearchProps<TickerCmcApiData[]>> = ({
  data,
  setTicker,
  setIsPrettySearchOpen,
}) => {
  const handleTickerSelect = (token: TickerCmcApiData) => {
    setTicker({ label: token.symbol, value: token.symbol as Ticker });
    setIsPrettySearchOpen(false);
  };
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {data.map((token) => {
        const { price = 0, percent_change_24h } = token.quote.USD;
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
              {percent_change_24h > 0 ? (
                <TbTriangleFilled />
              ) : (
                <TbTriangleInvertedFilled />
              )}
              <span className="font-bold">
                {formatNumberToSignificantDigits(percent_change_24h)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrettySearchPopularToken;

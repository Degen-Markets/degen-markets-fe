import {
  formatLargeNumber,
  formatNumberToSignificantDigits,
} from "@/app/lib/utils/bets/helpers";
import { TickerCmcApiData } from "@/app/lib/utils/bets/types";
import Image from "next/image";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

interface TokenInfoProps {
  data: TickerCmcApiData;
  rank: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ data, rank }) => {
  const { quote, symbol, name } = data;
  const marketCapDom = quote.USD.market_cap_dominance ?? 0;
  const tokenPrice = quote.USD.price ?? 0;
  const volume = quote.USD.volume_24h ?? 0;
  const volume_change_24h = quote.USD.volume_change_24h ?? 0;

  return (
    <div className="w-full flex items-center justify-start px-2 space-x-3">
      {/* <span className="text-cadet-blue-light text-lg ">{rank}.</span> */}
      <div className=" mb-1 w-full">
        <div className="flex flex-col">
          <div className="center-all space-x-1">
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-x-3">
                <div className="rounded-full w-7 h-7 ">
                  <Image
                    src={`/tokens/${symbol === "$mfer" ? "MFER" : symbol.toUpperCase()}.svg`}
                    width={28}
                    height={28}
                    alt={symbol}
                    className="rounded-full"
                  />
                </div>
                <div className="font-bold -space-y-1 ">
                  <div className="text-white text-lg text-start">
                    {symbol.toUpperCase()}
                  </div>
                  <div className="text-sm text-start text-cadet-blue-light ">
                    ${formatLargeNumber(volume)} Vol
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white text-sm text-end font-bold">
                  ${formatNumberToSignificantDigits(tokenPrice as number)}
                </div>
                <div className="flex items-center text-sm text-white space-x-1 font-bold">
                  <div
                    className={twMerge(
                      "text-xs text-cadet-blue-light flex justify-center items-center space-x-1",
                      volume_change_24h >= 0
                        ? "text-green-light"
                        : "text-red-light",
                    )}
                  >
                    <span>
                      {volume_change_24h > 0 ? (
                        <TbTriangleFilled />
                      ) : (
                        <TbTriangleInvertedFilled />
                      )}
                    </span>
                    <span>
                      {formatNumberToSignificantDigits(volume_change_24h)}%
                    </span>
                  </div>
                  <span>/</span>
                  <div className=" text-sm text-end">
                    ${formatLargeNumber(marketCapDom)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-dashed border-cadet-blue-main pt-1.5" />
      </div>
    </div>
  );
};

export default TokenInfo;

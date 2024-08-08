import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import {
  BetComponentProps,
  Ticker,
  TickerCmcApiData,
} from "@/app/lib/utils/bets/types";
import { formatNumberToSignificantDigits } from "@/app/lib/utils/bets/helpers";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import { useBetContext } from "@/app/create-bet/BetContext";
import { tickerOptions } from "@/app/lib/utils/bets/constants";

export enum Metric {
  PRICE = "price",
  VOLUME = "volume_24h",
  MARKET_CAP_DOMINANCE = "market_cap_dominance",
}

type MetricSort = Metric.PRICE | Metric.VOLUME | Metric.MARKET_CAP_DOMINANCE;

const sortTokens = (
  tokens: TickerCmcApiData[],
  criteria: MetricSort,
  order: string,
) => {
  return tokens.sort((a, b) => {
    let aValue: number, bValue: number;

    switch (criteria) {
      case Metric.PRICE:
        aValue = a.quote.USD.price ?? 0;
        bValue = b.quote.USD.price ?? 0;
        break;
      case Metric.VOLUME:
        aValue = a.quote.USD.volume_24h ?? 0;
        bValue = b.quote.USD.volume_24h ?? 0;
        break;
      case Metric.MARKET_CAP_DOMINANCE:
        aValue = a.quote.USD.market_cap_dominance ?? 0;
        bValue = b.quote.USD.market_cap_dominance ?? 0;
        break;
      default:
        aValue = 0;
        bValue = 0;
    }

    return order === "asc" ? aValue - bValue : bValue - aValue;
  });
};

const TokenSearchComponent = ({
  tickerCmcResponse,
}: {
  tickerCmcResponse: BetComponentProps["tickerCmcResponse"];
}) => {
  const [sortCriteria, setSortCriteria] = useState<MetricSort>(Metric.PRICE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default is descending
  const { ticker, setTicker } = useBetContext();

  const mapted: TickerCmcApiData[] = tickerCmcResponse
    ? Object.values(tickerCmcResponse)
    : [];
  const filteredTokens: TickerCmcApiData[] = tickerCmcResponse
    ? Object.values(tickerCmcResponse).filter((token) =>
        [1, 1027].includes(token.id),
      )
    : [];

  const handleSortClick = (criteria: MetricSort) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortButtons: { label: string; sortKey: MetricSort }[] = [
    { label: "Price", sortKey: Metric.PRICE },
    { label: "Volume", sortKey: Metric.VOLUME },
    { label: "Market Cap Dominance", sortKey: Metric.MARKET_CAP_DOMINANCE },
  ];

  const sortedTokens = sortTokens(mapted, sortCriteria, sortOrder);

  return (
    <div className="bg-blue-secondary !m-0 p-4 rounded-xl w-full absolute -top-12 z-50">
      <Dropdown<Ticker>
        selectedOption={ticker}
        setSelectedOption={setTicker}
        placeHolder="Search Token"
        searchOption={tickerOptions}
        title="Select Token"
        isSearchable={true}
      />
      <h2 className="text-cadet-blue-light mb-2 font-bold text-xl">
        Popular Tokens
      </h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {filteredTokens.map((token) => {
          const price = token.quote.USD.price ?? 0;
          const name = token.name;
          const symbol = token.symbol;
          const volume_change_24h = token.quote.USD.volume_change_24h;
          return (
            <div className="bg-white p-3 rounded-xl" key={name}>
              <div className="flex items-center mb-1 space-x-1">
                <Image
                  src={`/tokens/${symbol}.svg`}
                  width={30}
                  height={30}
                  alt=""
                />
                <span className="text-black-main font-bold text-xl md:text-lg">
                  {name}
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

      <div className="flex justify-end items-center mb-2">
        <div className="flex items-center space-x-2">
          {sortButtons.map((button) => (
            <SortButton
              key={button.sortKey}
              label={button.label}
              sortKey={button.sortKey}
              sortCriteria={sortCriteria}
              sortOrder={sortOrder}
              onClick={handleSortClick}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="w-full justify-start items-center mb-2 pr-4">
          <div className="mb-1 w-full col-span-11">
            <div className="flex flex-col">
              <div className="center-all space-x-1">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-cadet-blue-light font-bold">
                    Top Tokens
                  </h2>
                  <div className="font-bold">
                    <div className="font-bold text-sm text-end">Price</div>
                    <div className="flex items-center justify-end text-xs space-x-2">
                      <div>% 24 Vol</div>
                      <span>/</span>
                      <div>MKT Cap Dom</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative text-black-main h-48 overflow-y-auto pr-4 rounded py-2"
        style={{
          boxShadow: "inset 0px 10px 8px -10px rgb(0 0 0 / 0.5)",
        }}
      >
        {sortedTokens.map((token, ind) => (
          <TokenInfo data={token} key={token.name} rank={ind + 1} />
        ))}
      </div>
    </div>
  );
};

export default TokenSearchComponent;

interface TokenInfoProps {
  data: TickerCmcApiData;
  rank: number;
}

function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
}

const TokenInfo: React.FC<TokenInfoProps> = ({ data, rank }) => {
  const { quote, symbol, name } = data;
  const marketCapDom = quote.USD.market_cap_dominance ?? 0;
  const tokenPrice = quote.USD.price ?? 0;
  const volume = quote.USD.volume_24h ?? 0;
  const volume_change_24h = quote.USD.volume_change_24h ?? 0;

  return (
    <div className="w-full justify-start px-2 items-center">
      {/* <span className="text-cadet-blue-light text-lg col-span-1">{rank}.</span> */}
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
                    ${formatNumber(volume)} Vol
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
                    ${formatNumber(marketCapDom)}
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
interface SortButtonProps {
  label: string;
  sortKey: MetricSort;
  sortCriteria: MetricSort;
  sortOrder: "asc" | "desc";
  onClick: (criteria: MetricSort) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  label,
  sortKey,
  sortCriteria,
  sortOrder,
  onClick,
}) => {
  const isActive = sortCriteria === sortKey;

  return (
    <button
      onClick={() => onClick(sortKey)}
      className={twMerge(
        "flex items-center space-x-1 border rounded-lg px-2 py-1 text-sm font-bold",
        isActive ? "text-blue-main bg-blue-light" : "text-cadet-blue-light",
      )}
    >
      <span>{label}</span>
      {isActive && (
        <IoIosArrowDown className={sortOrder === "asc" ? "rotate-180" : ""} />
      )}
    </button>
  );
};

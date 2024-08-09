import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TbTriangleFilled } from "react-icons/tb";
import {
  BetComponentProps,
  Metric,
  MetricSort,
  Ticker,
  TickerCmcApiData,
} from "@/app/lib/utils/bets/types";
import {
  formatNumberToSignificantDigits,
  sortPrettySeaerchTokens,
} from "@/app/lib/utils/bets/helpers";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import { useBetContext } from "@/app/create-bet/BetContext";
import { tickerOptions } from "@/app/lib/utils/bets/constants";
import TokenInfo from "./TokenInfo";
import SortButton from "./SortButton";

const TokenSearchComponent = ({
  tickerCmcResponse,
}: {
  tickerCmcResponse: BetComponentProps["tickerCmcResponse"];
}) => {
  const [sortCriteria, setSortCriteria] = useState<MetricSort>(Metric.PRICE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default is descending
  const { ticker, setTicker, setPrettySearch } = useBetContext();
  const prettySearchDropdownRef = useRef<HTMLDivElement>(null);
  const mapted: TickerCmcApiData[] = tickerCmcResponse
    ? Object.values(tickerCmcResponse)
    : [];

  const filteredTokens: TickerCmcApiData[] = tickerCmcResponse
    ? Object.values(tickerCmcResponse).filter(
        (token) => [1, 1027].includes(token.id), // btc , eth
      )
    : [];

  const handleSortClick = (criteria: MetricSort) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      prettySearchDropdownRef.current &&
      !prettySearchDropdownRef.current.contains(event.target as Node)
    ) {
      setPrettySearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortButtons: { label: string; sortKey: MetricSort }[] = [
    { label: "Price", sortKey: Metric.PRICE },
    { label: "Volume", sortKey: Metric.VOLUME },
    { label: "Mkt Cap Dom", sortKey: Metric.MARKET_CAP_DOMINANCE },
  ];

  const sortedTokens = sortPrettySeaerchTokens(mapted, sortCriteria, sortOrder);

  return (
    <div
      ref={prettySearchDropdownRef}
      className="bg-blue-secondary !m-0 p-4 rounded-xl w-full md:w-[416px] absolute top-0 md:top-8 z-50 border"
    >
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

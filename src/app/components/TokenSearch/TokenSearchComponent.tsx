import { useRef, useState } from "react";
import {
  BetComponentProps,
  Metric,
  MetricSort,
  Ticker,
  TickerCmcApiData,
} from "@/app/lib/utils/bets/types";
import { sortPrettySearchTokens } from "@/app/lib/utils/bets/helpers";
import Dropdown from "@/app/create-bet/_components/Dropdown";
import { useBetContext } from "@/app/create-bet/BetContext";
import { tickerOptions } from "@/app/lib/utils/bets/constants";
import PrettySearchTokensList from "./PrettySearchTokensList";
import SortButton from "./SortButton";
import useClickOutside from "@/app/hooks/useClickOutside";
import PrettySearchPopularToken from "./PrettySearchPopularToken";
interface TokenSearchComponentsProps {
  tickerCmcResponse: BetComponentProps["tickerCmcResponse"];
  setIsPrettySearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenSearchComponent = ({
  tickerCmcResponse,
  setIsPrettySearchOpen,
}: TokenSearchComponentsProps) => {
  const [sortCriteria, setSortCriteria] = useState<MetricSort>(Metric.PRICE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { ticker, setTicker } = useBetContext();
  const prettySearchDropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(prettySearchDropdownRef, () => setIsPrettySearchOpen(false));

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
    { label: "Mkt Cap Dom", sortKey: Metric.MARKET_CAP_DOMINANCE },
  ];

  const sortedTokens = sortPrettySearchTokens(mapted, sortCriteria, sortOrder);

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
        title="Search Token"
        isSearchable={true}
        setIsPrettySearchOpen={setIsPrettySearchOpen}
      />
      <h2 className="text-cadet-blue-light my-2 font-bold text-xl">
        {" "}
        Popular Tokens
      </h2>
      <PrettySearchPopularToken
        data={filteredTokens}
        setTicker={setTicker}
        setIsPrettySearchOpen={setIsPrettySearchOpen}
      />
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
        className="relative text-black-main h-48 overflow-y-auto rounded py-2"
        style={{
          boxShadow: "inset 0px 10px 8px -10px rgb(0 0 0 / 0.5)",
        }}
      >
        {sortedTokens.map((token, ind) => (
          <PrettySearchTokensList
            data={token}
            key={token.name}
            rank={ind + 1}
            setTicker={setTicker}
            setIsPrettySearchOpen={setIsPrettySearchOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default TokenSearchComponent;

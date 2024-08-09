import React from "react";
import TokenSearchComponent from "./TokenSearchComponent";
import Image from "next/image";
import { useBetContext } from "@/app/create-bet/BetContext";
import { TickerCmcApiData } from "@/app/lib/utils/bets/types";

const PrettySearch = ({
  tickerCmcResponse,
}: {
  tickerCmcResponse: TickerCmcApiData | null;
}) => {
  const { setPrettySearch, prettySearch, ticker } = useBetContext();
  return (
    <div className="w-full relative">
      <label className="text-left font-bold whitespace-nowrap">Bet at:</label>

      <div>
        <div
          onClick={() => setPrettySearch(!prettySearch)}
          className="flex items-center bg-white rounded-lg px-2 py-3 space-x-2 w-full"
        >
          <Image
            src={`/tokens/${ticker.value}.svg`}
            width={24}
            height={24}
            alt={ticker.label}
          />
          <input
            type="text"
            value={ticker.value}
            className={` ring-purple-medium text-[#000] uppercase w-full rounded-md outline-none focus:outline-none border-none}`}
            placeholder="Search Token"
          />
        </div>
      </div>
      {prettySearch && (
        <TokenSearchComponent tickerCmcResponse={tickerCmcResponse} />
      )}
    </div>
  );
};

export default PrettySearch;

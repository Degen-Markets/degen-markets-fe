"use client";

import { Ticker } from "@/app/lib/utils/bets/types";
import Reel from "@/app/components/Reel";
import {
  currencyOptions,
  dayOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";

export default function CreateBet() {
  return (
    <main>
      <div>
        <Reel<string> reelOptions={tickerOptions} />
        <br />
        <Reel<string> reelOptions={metricOptions} />
        <br />
        <Reel<string> reelOptions={currencyOptions} />
        <br />
        <Reel<number> reelOptions={dayOptions} />
      </div>
    </main>
  );
}

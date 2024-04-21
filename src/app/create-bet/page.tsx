"use client";

import { Ticker } from "@/app/lib/utils/bets/types";
import Reel from "@/app/components/Reel";
import {
  currencyOptions,
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
      </div>
    </main>
  );
}

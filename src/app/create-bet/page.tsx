"use client";

import Reel from "@/app/components/Reel";
import {
  currencyOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
  directionOptions,
} from "@/app/lib/utils/bets/constants";
import { useState } from "react";
import { Metric, ReelOption } from "@/app/lib/utils/bets/types";

export default function CreateBet() {
  const [ticker, setTicker] = useState<ReelOption<string>>(tickerOptions[0]);
  const [metric, setMetric] = useState<ReelOption<Metric>>(metricOptions[0]);
  const [direction, setDirection] = useState<ReelOption<boolean>>(
    directionOptions[0],
  );
  const [duration, setDuration] = useState<ReelOption<number>>(
    durationOptions[0],
  );
  const [currency, setCurrency] = useState<ReelOption<string>>(
    currencyOptions[0],
  );

  return (
    <main>
      <div>
        <Reel<string>
          selectedOption={ticker}
          setSelectedOption={setTicker}
          reelOptions={tickerOptions}
          title="Bet on:"
        />
        <Reel<Metric>
          selectedOption={metric}
          setSelectedOption={setMetric}
          reelOptions={metricOptions}
          title="Metric:"
        />
        <Reel<boolean>
          selectedOption={direction}
          setSelectedOption={setDirection}
          reelOptions={directionOptions}
          title="Direction:"
        />
        <Reel<number>
          selectedOption={duration}
          setSelectedOption={setDuration}
          reelOptions={durationOptions}
          title="Duration:"
        />
        <Reel<string>
          selectedOption={currency}
          setSelectedOption={setCurrency}
          reelOptions={currencyOptions}
          title="Settle Bet in:"
        />
      </div>
      <br />
      <br />
      <div>
        Bet on {ticker.label} that it&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {duration.label.toLowerCase()}.
      </div>
    </main>
  );
}

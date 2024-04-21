"use client";

import Reel from "@/app/components/Reel/Reel";
import {
  currencyOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
  directionOptions,
  USDC_ADDRESS,
  DEGEN_MARKETS_ADDRESS,
  USDbC_ADDRESS,
} from "@/app/lib/utils/bets/constants";
import { useEffect, useState } from "react";
import { connect, injected, readContract } from "@wagmi/core";
import { Currency, Metric, ReelOption } from "@/app/lib/utils/bets/types";
import styles from "./page.module.css";
import { maxInt256, parseEther, parseUnits } from "viem";
import { ERC20_ABI } from "@/app/lib/utils/bets/abis";
import { config } from "@/app/providers";
import { useAccount } from "wagmi";
import { base } from "wagmi/chains";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";

export default function CreateBet() {
  const [ticker, setTicker] = useState(tickerOptions[0]);
  const [metric, setMetric] = useState(metricOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [currency, setCurrency] = useState<ReelOption<string>>(
    currencyOptions[0],
  );
  const [value, setValue] = useState("10");
  const { address } = useAccount();
  const { userAllowances } = useAllowances(address);
  const { userBalances } = useBalances(address);

  const isEth = currency.label === Currency.ETH;
  const valueInWei = isEth ? parseEther(value) : parseUnits(value, 6);
  const isAllowanceEnough =
    userAllowances[currency.label as Currency] >= valueInWei;
  const isBalanceEnough =
    userBalances[currency.label as Currency] >= valueInWei;
  const isActionDisabled = !isBalanceEnough;

  const getActionButtonText = (): string => {
    if (!address) {
      return "Connect Wallet";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return "Approve";
    }
    return "Create Bet";
  };

  return (
    <main>
      <div className={styles.reels}>
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
      <input
        className="text-black"
        type="number"
        lang="en-US"
        step="any"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <br />
      <div>
        Bet that {ticker.label}&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {duration.label.toLowerCase()}.
      </div>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isActionDisabled}
      >
        {getActionButtonText()}
      </button>
    </main>
  );
}

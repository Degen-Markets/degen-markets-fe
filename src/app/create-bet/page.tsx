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
import { readContract } from "@wagmi/core";
import { Currency, Metric, ReelOption } from "@/app/lib/utils/bets/types";
import styles from "./page.module.css";
import { maxInt256 } from "viem";
import { ERC20_ABI } from "@/app/lib/utils/bets/abis";
import { config } from "@/app/providers";
import { useAccount } from "wagmi";
import { base } from "wagmi/chains";

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
  const [userAllowances, setUserAllowances] = useState({
    [Currency.USDC]: BigInt(0),
    [Currency.USDbC]: BigInt(0),
    [Currency.ETH]: maxInt256,
  });
  const { address } = useAccount();

  const getERC20Allowances = async () => {
    const usdcAllowance = (await readContract(config, {
      abi: ERC20_ABI,
      address: USDC_ADDRESS,
      functionName: "allowance",
      args: [address, DEGEN_MARKETS_ADDRESS],
      chainId: base.id,
    })) as bigint;

    const USDbCAllowance = (await readContract(config, {
      abi: ERC20_ABI,
      address: USDbC_ADDRESS,
      functionName: "allowance",
      args: [address, DEGEN_MARKETS_ADDRESS],
      chainId: base.id,
    })) as bigint;

    setUserAllowances({
      [Currency.USDC]: usdcAllowance,
      [Currency.USDbC]: USDbCAllowance,
      [Currency.ETH]: maxInt256,
    });
  };

  useEffect(() => {
    getERC20Allowances();
  }, []);

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
      <div>
        Bet that {ticker.label} that it&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {duration.label.toLowerCase()}.
      </div>
    </main>
  );
}

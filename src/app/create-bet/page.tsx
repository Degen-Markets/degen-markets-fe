"use client";

import Reel from "@/app/components/Reel/Reel";
import {
  currencyOptions,
  DEGEN_MARKETS_ADDRESS,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Currency, Metric, ReelOption } from "@/app/lib/utils/bets/types";
import styles from "./page.module.css";
import { maxUint256, parseEther, parseUnits } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { DEGEN_MARKETS_ABI, ERC20_ABI } from "@/app/lib/utils/bets/abis";
import { base } from "wagmi/chains";

export default function CreateBet() {
  const [ticker, setTicker] = useState(tickerOptions[0]);
  const [metric, setMetric] = useState(metricOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [currency, setCurrency] = useState<ReelOption<`0x${string}`>>(
    currencyOptions[0],
  );
  const [value, setValue] = useState("10");
  const { address } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const { userAllowances } = useAllowances(address);
  const { userBalances } = useBalances(address);

  const isEth = currency.label === Currency.ETH;
  const valueInWei = isEth ? parseEther(value) : parseUnits(value, 6);
  const isAllowanceEnough =
    userAllowances[currency.label as Currency] >= valueInWei;
  const isBalanceEnough =
    userBalances[currency.label as Currency] >= valueInWei;
  const isActionDisabled = !isBalanceEnough;

  const approve = () => {
    writeContract({
      abi: ERC20_ABI,
      address: currency.value,
      functionName: "approve",
      args: [DEGEN_MARKETS_ADDRESS, maxUint256],
    });
  };

  const createBet = async () => {
    const randomId = uuid();
    writeContract({
      abi: DEGEN_MARKETS_ABI,
      address: DEGEN_MARKETS_ADDRESS,
      functionName: "createBet",
      args: [
        randomId,
        duration.value,
        ticker.value,
        metric.value,
        direction.value,
        valueInWei,
        currency.value,
      ],
      value: isEth ? valueInWei : undefined,
      chainId: base.id,
    });
  };

  const handleActionButtonClick = async () => {
    if (!isAllowanceEnough) {
      await approve();
      return;
    }
    await createBet();
  };

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
        <Reel<`0x${string}`>
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
        onClick={handleActionButtonClick}
      >
        {getActionButtonText()}
      </button>
    </main>
  );
}

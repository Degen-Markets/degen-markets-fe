"use client";

import Reel from "@/app/components/Reel";
import {
  currencyOptions,
  DEGEN_MARKETS_ADDRESS,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
} from "@/app/lib/utils/bets/constants";
import { v4 as uuid } from "uuid";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Currency,
  Metric,
  ReelOption,
  Ticker,
} from "@/app/lib/utils/bets/types";
import {
  erc20Abi,
  maxUint256,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { base } from "wagmi/chains";
import { getETHPrice } from "@/app/lib/utils/api/getETHPrice";
import { Heading, Headline } from "@/app/components/Heading";
import { ButtonPrimary } from "@/app/components/Button";
import { getRandomOption } from "@/app/lib/utils/bets/helpers";
import { boolean } from "superstruct";

export default function CreateBet() {
  const router = useRouter();
  const [ethPrice, setEthPrice] = useState(3_200);
  const [ticker, setTicker] = useState(tickerOptions[0]);
  const [metric, setMetric] = useState(metricOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [currency, setCurrency] = useState<ReelOption<`0x${string}`>>(
    currencyOptions[0],
  );
  const [value, setValue] = useState("10");
  const { address } = useAccount();
  const { writeContract: sendApprovalTx, data: approvalHash } =
    useWriteContract();
  const {
    writeContract: sendCreateBetTx,
    data: createBetHash,
    variables: createBetVariables,
  } = useWriteContract();
  const id = createBetVariables?.args && createBetVariables.args[0];
  const { isSuccess: isCreateBetTxSuccess } = useTransactionReceipt({
    hash: createBetHash,
    chainId: base.id,
  });
  const { isSuccess: isApprovalSuccess } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });
  const { userAllowances } = useAllowances(
    isApprovalSuccess || isCreateBetTxSuccess,
    address || zeroAddress,
  );
  const { userBalances } = useBalances(isCreateBetTxSuccess, address);

  const isEth = currency.label === Currency.ETH;
  const valueInWei = isEth ? parseEther(value) : parseUnits(value, 6);
  const isAllowanceEnough =
    userAllowances[currency.label as Currency] >= valueInWei;
  const isBalanceEnough =
    userBalances[currency.label as Currency] >= valueInWei;
  const isActionDisabled = !isBalanceEnough || !address;

  const approve = () => {
    sendApprovalTx({
      abi: erc20Abi,
      address: currency.value,
      functionName: "approve",
      args: [DEGEN_MARKETS_ADDRESS, maxUint256],
    });
  };

  const createBet = async () => {
    const randomId = uuid();
    sendCreateBetTx({
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
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return "Approve and bet";
    }
    return "Create Bet";
  };

  useEffect(() => {
    if (isApprovalSuccess) {
      createBet();
    }
  }, [isApprovalSuccess]);

  useEffect(() => {
    if (isCreateBetTxSuccess) {
      router.push(`/create-bet/success?id=${id}`);
    }
  }, [isCreateBetTxSuccess]);

  const fetchEthPrice = async () => {
    const {
      data: { rate },
    } = await getETHPrice();
    setEthPrice(Number(rate.toFixed(2)));
  };

  useEffect(() => {
    fetchEthPrice();
  }, []);

  const handleValueInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const decimals = newValue.split(/\,|\./)[1];
    if (!decimals || decimals.length < 7) {
      setValue(newValue);
    }
  };

  const randomizeAllOptions = () => {
    setTicker(getRandomOption<Ticker>(tickerOptions));
    setMetric(getRandomOption<Metric>(metricOptions));
    setDirection(getRandomOption<boolean>(directionOptions));
    setDuration(getRandomOption<number>(durationOptions));
    setCurrency(getRandomOption<`0x${string}`>(currencyOptions));
  };

  return (
    <main className="text-center">
      <div className="flex justify-center select-none">
        <Heading className="mt-10 mb-12">
          <Headline>Challenge a fren</Headline>
        </Heading>
      </div>
      <div className="flex justify-center select-none">
        <div className="eight-bit-border-20 bg-blue-dark px-5 md:px-10 pb-5 flex">
          <div
            className="flex mt-[-30px] md:mt-[-40px]" /* move reels out of bg on top */
          >
            <Reel<Ticker>
              selectedOption={ticker}
              setSelectedOption={setTicker}
              reelOptions={tickerOptions}
              title="&nbsp;&nbsp;Bet on:&nbsp;&nbsp;"
            />
            <Reel<Metric>
              selectedOption={metric}
              setSelectedOption={setMetric}
              reelOptions={metricOptions}
              title="&nbsp;Metric:&nbsp;&nbsp;"
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
              title="&nbsp;&nbsp;Bet in:&nbsp;&nbsp;"
            />
          </div>
          <div className="ml-[30px] w-[140px] mt-auto mb-auto lg:block hidden">
            <img
              onClick={randomizeAllOptions}
              className="cursor-pointer"
              src="./randomize-create-bet-button.svg"
              alt="Randomize options button"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[20px]">
        <div className="border-purple-medium border-2 w-max flex justify-center">
          <div className="border-purple-medium border pr-5 pl-5 bg-blue-dark">
            AMOUNT
          </div>
          <input
            className="text-blue-dark text-center"
            type="number"
            lang="en-US"
            step=".000001" // TODO: only allow up to 6 decimals
            value={value}
            onChange={handleValueInput}
          />
        </div>
      </div>
      <div className="text-yellow-light">
        ${isEth ? (Number(value) * ethPrice).toLocaleString() : value}
      </div>
      <div className="text-blue-dark mb-4">
        Bet that {ticker.label}&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {duration.label.toLowerCase()}.
      </div>
      <div className="flex justify-center">
        <ButtonPrimary
          size={"regular"}
          disabled={isActionDisabled}
          onClick={handleActionButtonClick}
        >
          {getActionButtonText()}
        </ButtonPrimary>
      </div>
    </main>
  );
}

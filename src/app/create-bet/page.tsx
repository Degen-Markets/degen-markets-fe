"use client";

import Reel from "@/app/components/Reel";
import {
  DEGEN_MARKETS_ADDRESS,
  directionOptions,
  durationOptions,
  metricOptions,
  tickerOptions,
  currencyOptions,
} from "@/app/lib/utils/bets/constants";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { Currency, Metric, ReelOption } from "@/app/lib/utils/bets/types";
import { maxUint256, parseEther, parseUnits, zeroAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { redirect } from "next/navigation";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { base } from "wagmi/chains";
import { erc20Abi } from "viem";
import PixelatedHeadingContainer from "@/app/components/PixelatedHeadingContainer";

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
  const isActionDisabled = !isBalanceEnough;

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
      return "Connect Wallet";
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
      redirect(`/create-bet/success?id=${id}`);
    }
  }, [isCreateBetTxSuccess]);

  return (
    <main className="text-center">
      <div className="flex justify-center select-none">
        <PixelatedHeadingContainer classNames="my-10 w-[600px]">
          Challenge a fren
        </PixelatedHeadingContainer>
      </div>
      <div className="flex justify-center select-none">
        <div className="bg-blue-dark w-max flex pr-10 pl-10 pb-5">
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
      </div>
      <br />
      <br />
      <div className="flex justify-center">
        <div className="border-yellow-dark border-2 w-max flex justify-center">
          <div className="border-yellow-dark border pr-5 pl-5 bg-blue-dark">
            AMOUNT
          </div>
          <input
            className="text-blue-dark text-center"
            type="number"
            lang="en-US"
            step=".000001" // TODO: only allow up to 6 decimals
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="text-blue-dark">
        Bet that {ticker.label}&apos;s {metric.label} goes&nbsp;
        {direction.label.toLowerCase()} in {duration.label.toLowerCase()}.
      </div>
      <br />
      <button
        className="cursor-pointer hover:bg-blue-700 text-blue-dark font-bold py-2 px-4 rounded bg-yellow-dark border-blue-dark border-2"
        disabled={isActionDisabled}
        onClick={handleActionButtonClick}
      >
        {getActionButtonText()}
      </button>
    </main>
  );
}

"use client";

import { ButtonPrimary } from "@/app/components/Button";
import React, { useEffect, useState } from "react";
import { useBetContext } from "@/app/create-bet/BetContext";
import { Currency, Tx } from "@/app/lib/utils/bets/types";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import {
  Address,
  erc20Abi,
  maxUint256,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { useAccount } from "wagmi";
import { base } from "wagmi/chains";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { config } from "@/app/providers";
import { useToast } from "@/app/components/Toast/ToastProvider";

const ActionButton: React.FC<{}> = () => {
  const router = useRouter();
  const {
    value,
    currency,
    duration,
    ticker,
    metric,
    direction,
    isProMode,
    customDuration,
  } = useBetContext();

  const durationValue = isProMode
    ? BigInt(customDuration.value)
    : BigInt(duration.value);
  const { address } = useAccount();
  const [approvalHash, setApprovalHash] = useState<string | null>(null);
  const [createBetHash, setCreateBetHash] = useState<string | null>(null);
  const [txState, setTxState] = useState<Tx>(Tx.Idle);
  const [betId, setBetId] = useState<string | null>(null);
  const { showToast } = useToast();

  const isStateIdle = txState === Tx.Idle;

  const { userAllowances } = useAllowances(
    !!approvalHash || !!createBetHash,
    address || zeroAddress,
  );

  const { userBalances } = useBalances(!!createBetHash, address);

  const isEth = currency.label === Currency.ETH;
  const valueInWei = isEth ? parseEther(value) : parseUnits(value, 6);

  const isAllowanceEnough =
    userAllowances[currency.label as Currency] >= valueInWei;
  const isBalanceEnough =
    userBalances[currency.label as Currency] >= valueInWei;
  const isActionDisabled = !isBalanceEnough || !address || Number(value) <= 0;

  const approve = async () => {
    try {
      setTxState(Tx.Pending);
      const hash = await writeContract(config, {
        abi: erc20Abi,
        address: currency.value,
        functionName: "approve",
        args: [DEGEN_BETS_ADDRESS, maxUint256],
      });
      setTxState(Tx.Processing);
      await waitForTransactionReceipt(config, { hash });
      setApprovalHash(hash);
      // await refreshAllowances();
    } catch (error: any) {
      console.error("Error during approval:", error);
      setTxState(Tx.Idle);
      showToast(error.shortMessage ?? error, "error");
    } finally {
      setTxState(Tx.Idle);
    }
  };

  const createBet = async () => {
    try {
      const randomId = uuid();
      setBetId(randomId);
      setTxState(Tx.Pending);
      const hash = await writeContract(config, {
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "createBet",
        args: [
          randomId,
          "binary",
          durationValue,
          ticker.value,
          metric.value,
          "",
          direction.value,
          valueInWei,
          currency.value,
        ],
        value: isEth ? valueInWei : undefined,
        chainId: base.id,
      });
      setCreateBetHash(hash);
      setTxState(Tx.Processing);
      await waitForTransactionReceipt(config, { hash });
    } catch (error: any) {
      console.error("Error creating Bet", { error });
      setTxState(Tx.Idle);
      showToast(error.shortMessage ?? error, "error");
    } finally {
      setTxState(Tx.Idle);
    }
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
      return `Approve ${currency.label}`;
    }
    return "Create Bet";
  };

  useEffect(() => {
    if (createBetHash) {
      const checkTransactionReceipt = async () => {
        const receipt = await waitForTransactionReceipt(config, {
          hash: createBetHash as Address,
        });
        if (receipt.status === "success") {
          router.push(`/create-bet/success?id=${betId}`);
        }
      };
      checkTransactionReceipt();
    }
  }, [createBetHash]);

  return (
    <div className="flex justify-center">
      <ButtonPrimary
        loader={true}
        txState={txState}
        size={"regular"}
        disabled={isActionDisabled || !isStateIdle}
        onClick={handleActionButtonClick}
      >
        {getActionButtonText()}
      </ButtonPrimary>
    </div>
  );
};

export default ActionButton;

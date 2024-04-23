import { readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { erc20Abi } from "viem";
import {
  DEGEN_MARKETS_ADDRESS,
  SETTLE_CURRENCY,
} from "@/app/lib/utils/bets/constants";
import { base } from "wagmi/chains";
import { Currency } from "@/app/lib/utils/bets/types";
import { maxUint256 } from "viem";
import { useEffect, useState } from "react";
import { useTransactionReceipt } from "wagmi";

const useAllowances = (shouldReFetch: boolean, address?: `0x${string}`) => {
  const [userAllowances, setUserAllowances] = useState({
    [Currency.USDC]: BigInt(0),
    [Currency.USDbC]: BigInt(0),
    [Currency.ETH]: maxUint256,
  });
  const getERC20Allowances = async () => {
    if (!address) {
      return;
    }
    const usdcAllowance = (await readContract(config, {
      abi: erc20Abi,
      address: SETTLE_CURRENCY.USDC,
      functionName: "allowance",
      args: [address, DEGEN_MARKETS_ADDRESS],
      chainId: base.id,
    })) as bigint;

    const USDbCAllowance = (await readContract(config, {
      abi: erc20Abi,
      address: SETTLE_CURRENCY.USDbC,
      functionName: "allowance",
      args: [address, DEGEN_MARKETS_ADDRESS],
      chainId: base.id,
    })) as bigint;

    setUserAllowances({
      [Currency.USDC]: usdcAllowance,
      [Currency.USDbC]: USDbCAllowance,
      [Currency.ETH]: maxUint256,
    });
  };

  useEffect(() => {
    getERC20Allowances();
  }, [address]);

  useEffect(() => {
    if (shouldReFetch) {
      getERC20Allowances();
    }
  }, [shouldReFetch]);

  return {
    userAllowances,
  };
};

export default useAllowances;

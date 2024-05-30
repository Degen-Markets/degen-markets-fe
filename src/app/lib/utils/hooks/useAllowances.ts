import { readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { erc20Abi } from "viem";
import {
  DEGEN_BETS_ADDRESS,
  SETTLE_CURRENCY,
} from "@/app/lib/utils/bets/constants";
import { base } from "wagmi/chains";
import { Currency } from "@/app/lib/utils/bets/types";
import { maxUint256 } from "viem";
import { useCallback, useEffect, useState } from "react";

const useAllowances = (shouldReFetch: boolean, address?: `0x${string}`) => {
  const [userAllowances, setUserAllowances] = useState({
    [Currency.USDC]: BigInt(0),
    [Currency.USDbC]: BigInt(0),
    [Currency.ETH]: maxUint256,
  });
  const getERC20Allowances = useCallback(async () => {
    if (!address) {
      return;
    }
    const usdcAllowance = (await readContract(config, {
      abi: erc20Abi,
      address: SETTLE_CURRENCY.USDC,
      functionName: "allowance",
      args: [address, DEGEN_BETS_ADDRESS],
      chainId: base.id,
    })) as bigint;

    const USDbCAllowance = (await readContract(config, {
      abi: erc20Abi,
      address: SETTLE_CURRENCY.USDbC,
      functionName: "allowance",
      args: [address, DEGEN_BETS_ADDRESS],
      chainId: base.id,
    })) as bigint;

    setUserAllowances({
      [Currency.USDC]: usdcAllowance,
      [Currency.USDbC]: USDbCAllowance,
      [Currency.ETH]: maxUint256,
    });
  }, [address]);

  const refreshAllowances = useCallback(async () => {
    await getERC20Allowances();
  }, [getERC20Allowances]);

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
    refreshAllowances,
  };
};

export default useAllowances;

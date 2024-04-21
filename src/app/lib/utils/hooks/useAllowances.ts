import { readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { ERC20_ABI } from "@/app/lib/utils/bets/abis";
import {
  DEGEN_MARKETS_ADDRESS,
  USDbC_ADDRESS,
  USDC_ADDRESS,
} from "@/app/lib/utils/bets/constants";
import { base } from "wagmi/chains";
import { Currency } from "@/app/lib/utils/bets/types";
import { maxUint256 } from "viem";
import { useEffect, useState } from "react";

const useAllowances = (address?: string) => {
  const [userAllowances, setUserAllowances] = useState({
    [Currency.USDC]: BigInt(0),
    [Currency.USDbC]: BigInt(0),
    [Currency.ETH]: maxUint256,
  });
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
      [Currency.ETH]: maxUint256,
    });
  };

  useEffect(() => {
    if (address) {
      getERC20Allowances();
    }
  }, [address]);

  return {
    userAllowances,
  };
};

export default useAllowances;

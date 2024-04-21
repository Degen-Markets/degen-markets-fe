import { getBalance, readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { ERC20_ABI } from "@/app/lib/utils/bets/abis";
import { USDbC_ADDRESS, USDC_ADDRESS } from "@/app/lib/utils/bets/constants";
import { base } from "wagmi/chains";
import { Currency } from "@/app/lib/utils/bets/types";
import { useEffect, useState } from "react";

const useBalances = (address?: `0x${string}`) => {
  const [userBalances, setUserBalances] = useState({
    [Currency.USDC]: BigInt(0),
    [Currency.USDbC]: BigInt(0),
    [Currency.ETH]: BigInt(0),
  });
  const getERC20Balances = async () => {
    if (address) {
      const usdcBalance = (await readContract(config, {
        abi: ERC20_ABI,
        address: USDC_ADDRESS,
        functionName: "balanceOf",
        args: [address],
        chainId: base.id,
      })) as bigint;

      const USDbCBalance = (await readContract(config, {
        abi: ERC20_ABI,
        address: USDbC_ADDRESS,
        functionName: "balanceOf",
        args: [address],
        chainId: base.id,
      })) as bigint;

      const ethBalance = await getBalance(config, {
        address,
      });

      setUserBalances({
        [Currency.USDC]: usdcBalance,
        [Currency.USDbC]: USDbCBalance,
        [Currency.ETH]: ethBalance.value,
      });
    }
  };

  useEffect(() => {
    getERC20Balances();
  }, [address]);

  return {
    userBalances,
  };
};

export default useBalances;

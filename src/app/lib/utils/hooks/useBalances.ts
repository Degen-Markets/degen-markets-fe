import { getBalance, readContract } from "@wagmi/core";
import { config } from "@/app/providers";
import { base } from "wagmi/chains";
import { Currency } from "@/app/lib/utils/bets/types";
import { useEffect, useState } from "react";
import { useTransactionReceipt } from "wagmi";
import { erc20Abi } from "viem";
import { SETTLE_CURRENCY } from "@/app/lib/utils/bets/constants";

const useBalances = (hash: `0x${string}`, address?: `0x${string}`) => {
  const [userBalances, setUserBalances] = useState({
    [Currency.USDC]: BigInt(0),
    [Currency.USDbC]: BigInt(0),
    [Currency.ETH]: BigInt(0),
  });
  const { isSuccess } = useTransactionReceipt({
    hash,
    chainId: base.id,
  });
  const getERC20Balances = async () => {
    if (address) {
      const usdcBalance = (await readContract(config, {
        abi: erc20Abi,
        address: SETTLE_CURRENCY.USDC,
        functionName: "balanceOf",
        args: [address],
        chainId: base.id,
      })) as bigint;

      const USDbCBalance = (await readContract(config, {
        abi: erc20Abi,
        address: SETTLE_CURRENCY.USDBC,
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

  useEffect(() => {
    if (isSuccess) {
      getERC20Balances();
    }
  }, [isSuccess]);

  return {
    userBalances,
  };
};

export default useBalances;

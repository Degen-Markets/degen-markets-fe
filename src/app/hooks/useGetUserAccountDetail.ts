import { useMemo } from "react";
import { useBalance } from "wagmi";
import {
  abbreviateETHBalance,
  getDisplayNameForAddress,
} from "../lib/utils/bets/helpers";
import { Address } from "viem";
import useIsChainSupported from "./useIsChainSupported";

const useGetUserAccountDetail = (address: Address) => {
  const { data: balance } = useBalance({ address });
  const { chain } = useIsChainSupported();
  const blockExplorerUrl = useMemo(
    () => chain?.blockExplorers.default.url,
    [chain],
  );
  const accountName = address
    ? getDisplayNameForAddress(address as Address)
    : "";

  const ethBalance = balance?.formatted;
  const accountEthBalance = ethBalance
    ? abbreviateETHBalance(parseFloat(ethBalance))
    : undefined;

  return {
    accountEthBalance,
    shortAccountAddress: accountName,
    blockExplorerUrl,
    symbol: balance?.symbol,
  };
};

export default useGetUserAccountDetail;

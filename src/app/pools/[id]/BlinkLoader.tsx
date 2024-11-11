"use client";
import "@dialectlabs/blinks/index.css";

import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { Blink, useAction } from "@dialectlabs/blinks";
import Skeleton from "@/app/components/Skeletons/Skeleton";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { formatNumberToSignificantDigits } from "@/app/lib/utils/helpers";
import { useMemo } from "react";
import { ACTION_API_URL, HELIUS_RPC_URL } from "@/app/config/api";

interface BlinkCardProps {
  poolId: string;
  poolValue?: string;
}
const BlinkLoader = ({ poolId, poolValue }: BlinkCardProps) => {
  // will get redirected to https://actions.degenmarkets.com/pools/${poolId} because of actions.json
  const actionApiUrl = `${ACTION_API_URL}/pools/${poolId}`;

  const { adapter } = useActionSolanaWalletAdapter(HELIUS_RPC_URL);
  const { action } = useAction({ url: actionApiUrl, adapter });

  const poolVolume = useMemo(() => {
    return formatNumberToSignificantDigits(
      Number(poolValue) / LAMPORTS_PER_SOL,
    );
  }, [poolValue]);

  if (!action) return <Skeleton />;

  return (
    <>
      {poolValue && (
        <div className="p-2 border border-b-0 rounded-2xl rounded-b-none border-primary-light bg-steel-gray z-10 relative top-5 flex justify-between items-center px-5 font-semibold">
          <h4 className="">Volume:</h4>

          <span className="hover:text-primary-light cursor-default transition-all ease-in duration-200">
            {poolVolume} SOL
          </span>
        </div>
      )}
      <Blink
        action={action}
        websiteText={new URL(actionApiUrl).hostname}
        stylePreset="x-dark"
      />
    </>
  );
};
export default BlinkLoader;

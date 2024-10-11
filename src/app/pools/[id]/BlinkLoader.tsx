"use client";
import "@dialectlabs/blinks/index.css";

import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { Blink, useAction } from "@dialectlabs/blinks";
import Skeleton from "@/app/pools/[id]/Skeleton";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { formatNumberToSignificantDigits } from "@/app/lib/utils/helpers";
import { useMemo } from "react";

const RPC_URL =
  "https://mainnet.helius-rpc.com/?api-key=e56ebb46-0709-4b0c-907e-4b6aa24d281b";

interface BlinkCardProps {
  poolId: string;
  poolValue?: string;
}
const BlinkLoader = ({ poolId, poolValue }: BlinkCardProps) => {
  // will get redirected to https://actions.degenmarkets.com/pools/${poolId} because of actions.json
  const actionApiUrl = `https://degenmarkets.com/pools/${poolId}`;

  const { adapter } = useActionSolanaWalletAdapter(RPC_URL);
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
        <div className="p-2 border border-b-0 rounded-2xl rounded-b-none border-purple-light bg-black-medium z-10 relative top-5 flex justify-between items-center px-5 font-semibold">
          <h4 className="">Volume:</h4>

          <span className="hover:text-purple-light cursor-default transition-all ease-in duration-200">
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

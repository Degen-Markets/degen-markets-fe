"use client";
import "@dialectlabs/blinks/index.css";

import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { Blink, useAction } from "@dialectlabs/blinks";
import Skeleton from "@/app/pools/[address]/Skeleton";

const RPC_URL =
  "https://mainnet.helius-rpc.com/?api-key=e56ebb46-0709-4b0c-907e-4b6aa24d281b";

interface BlinkCardProps {
  poolId: string;
}
const BlinkLoader = ({ poolId }: BlinkCardProps) => {
  // will get redirected to https://actions.degenmarkets.com/pools/${poolId} because of actions.json
  const actionApiUrl = `https://degenmarkets.com/pools/${poolId}`;

  const { adapter } = useActionSolanaWalletAdapter(RPC_URL);
  const { action } = useAction({ url: actionApiUrl, adapter });

  if (!action) return <Skeleton />;

  return (
    <Blink
      action={action}
      websiteText={new URL(actionApiUrl).hostname}
      stylePreset="x-dark"
    />
  );
};
export default BlinkLoader;

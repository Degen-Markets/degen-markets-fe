"use client";
import "@dialectlabs/blinks/index.css";

import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { Blink, useAction } from "@dialectlabs/blinks";

const RPC_URL =
  "https://mainnet.helius-rpc.com/?api-key=d89de0bd-ea34-4f41-9f17-5e0715a54d78";

interface BlinkCardProps {
  poolId: string;
}
const BlinkCard = ({ poolId }: BlinkCardProps) => {
  const actionApiUrl = `https://actions.degenmarkets.com/pools/${poolId}`;
  const { adapter } = useActionSolanaWalletAdapter(RPC_URL);
  const { action } = useAction({ url: actionApiUrl, adapter });
  return action ? (
    <Blink action={action} websiteText={new URL(actionApiUrl).hostname} />
  ) : null;
};
export default BlinkCard;

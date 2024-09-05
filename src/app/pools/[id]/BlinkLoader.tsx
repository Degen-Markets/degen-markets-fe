"use client";
import "@dialectlabs/blinks/index.css";

import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { Blink, useAction } from "@dialectlabs/blinks";

const RPC_URL = "https://api.mainnet-beta.solana.com";

interface BlinkCardProps {
  poolId: string;
}
const BlinkLoader = ({ poolId }: BlinkCardProps) => {
  // eslint-disable-next-line no-console
  console.log("poolId :", poolId);

  const actionApiUrl = `https://dial.to/donate`;

  const { adapter } = useActionSolanaWalletAdapter(RPC_URL);
  const { action } = useAction({ url: actionApiUrl, adapter });

  if (!action) return null;

  return (
    <Blink
      action={action}
      websiteText={new URL(actionApiUrl).hostname}
      stylePreset="x-dark"
    />
  );
};
export default BlinkLoader;

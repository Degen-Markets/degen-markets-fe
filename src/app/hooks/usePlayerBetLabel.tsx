import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

export function usePlayerBetLabel() {
  const pathname = usePathname();
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toBase58();

  const playerId = useMemo(() => {
    const match = pathname.match(/^\/players\/([^/]+)$/);
    return match ? match[1] : null;
  }, [pathname]);

  const isPlayerRoute = !!playerId;

  const betLabel = useMemo(() => {
    if (!isPlayerRoute) {
      return "You bet";
    }
    return publicKey === playerId ? "You bet" : "Player Bet";
  }, [isPlayerRoute, publicKey, playerId]);

  return betLabel;
}

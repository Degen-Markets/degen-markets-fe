import { WalletContextState } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import bs58 from "bs58";

export async function signMessage(
  wallet: WalletContextState,
): Promise<{ message: string; signature: Uint8Array } | null> {
  const message = "Welcome to degenmarkets.com"; // "this same string is stored in the backend and verified on api requests, please do not change"
  const messageBytes = Buffer.from(message, "utf8");

  if (!wallet || !wallet.connected || !wallet.signMessage) {
    throw new Error(
      "Wallet is not connected or doesn't support message signing",
    );
  }

  try {
    const signature = await wallet.signMessage(messageBytes);
    return { message, signature };
  } catch (error) {
    console.error("Error signing the message:", error);
    return null;
  }
}

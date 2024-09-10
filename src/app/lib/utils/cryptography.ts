import { WalletContextState } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import bs58 from "bs58";

export async function signMessage(
  wallet: WalletContextState,
): Promise<{ message: string; signature: Uint8Array } | null> {
  const message = "Welcome to degenmarkets.com";
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

export async function verifySignedMessage(
  wallet: WalletContextState,
  messageToVerify: string,
  signature: Uint8Array,
): Promise<boolean> {
  const messageBytes = Buffer.from(messageToVerify, "utf-8");

  if (!wallet || !wallet.connected || !wallet.publicKey) {
    console.error(
      "Error: Wallet is not connected or does not have a public key",
    );
    return false;
  }

  try {
    const publicKeyBase58 = bs58.decode(wallet.publicKey.toBase58());
    const verified = nacl.sign.detached.verify(
      messageBytes,
      signature,
      publicKeyBase58,
    );
    return verified;
  } catch (error) {
    console.error("Error during signature verification:", error);
    return false;
  }
}

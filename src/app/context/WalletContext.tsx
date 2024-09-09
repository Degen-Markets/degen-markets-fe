"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletProvider,
  ConnectionProvider,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";
import bs58 from "bs58";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

interface WalletContextType {
  walletAddress: string | null;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const wallet = useWallet();

  // Automatically set the wallet address when the wallet is connected
  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      setWalletAddress(wallet.publicKey.toBase58());
    } else {
      setWalletAddress(null);
    }
  }, [wallet.connected, wallet.publicKey]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
          </WalletContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useSolanaWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error(
      "useSolanaWallet must be used within a WalletContextProvider",
    );
  }
  return context;
}

export async function signMessage(
  wallet: WalletContextState,
): Promise<{ message: string; signature: Uint8Array } | null> {
  const message = "Welcome to degenmarkets.com";
  const messageBytes = decodeUTF8(message);

  if (!wallet || !wallet.connected || !wallet.signMessage) {
    throw new Error(
      "Wallet is not connected or doesn't support message signing",
    );
  }

  try {
    const signature = await wallet.signMessage(messageBytes);
    console.log({
      message,
      signature: bs58.encode(signature), // Display signature in Base58 for readability
    });
    return { message, signature };
  } catch (error) {
    console.error("Error signing the message:", error);
    return null; // Explicitly return null if signing fails
  }
}

export async function verifySignedMessage(
  wallet: WalletContextState,
  messageToVerify: string,
  signature: Uint8Array,
): Promise<boolean> {
  const messageBytes = decodeUTF8(messageToVerify);

  if (!wallet || !wallet.connected || !wallet.publicKey) {
    console.error(
      "Error: Wallet is not connected or does not have a public key",
    );
    return false;
  }

  try {
    const publicKeyBytes = bs58.decode(wallet.publicKey.toString());
    const verified = nacl.sign.detached.verify(
      messageBytes,
      signature,
      publicKeyBytes,
    );
    return verified;
  } catch (error) {
    console.error("Error during signature verification:", error);
    return false;
  }
}

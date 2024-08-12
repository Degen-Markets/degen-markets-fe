"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const SolanaWallet: FC = () => {
  return <WalletMultiButton style={{ textWrap: "nowrap" }} />;
};

export default SolanaWallet;

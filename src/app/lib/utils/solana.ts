import { Connection } from "@solana/web3.js";

export const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=d89de0bd-ea34-4f41-9f17-5e0715a54d78",
  "confirmed",
);

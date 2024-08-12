import * as anchor from "@coral-xyz/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import idl from "./target/idl/degen_pools.json";
import { DegenPools } from "@/app/lib/utils/target/types/degen_pools";

export const connection = new Connection(
  clusterApiUrl("mainnet-beta"),
  "confirmed",
);

"use client";
import { connection } from "@/app/lib/utils/solana";
import { AnchorProvider } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import idl from "@/app/lib/utils/target/idl/degen_pools.json";
import { DegenPools } from "@/app/lib/utils/target/types/degen_pools";

const useSolana = () => {
  // @ts-ignore
  if (!window || !window.solana) {
    return { program: undefined, provider: undefined };
  }
  // @ts-ignore
  const solana = window.solana;
  const provider = new AnchorProvider(connection, solana, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(
    idl as unknown as anchor.Idl,
    provider,
  ) as unknown as anchor.Program<DegenPools>;
  return {
    program,
    provider,
  };
};

export default useSolana;

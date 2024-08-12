"use client";
import { Entry, Pool } from "@/app/lib/utils/bets/types";
import { useWallet } from "@solana/wallet-adapter-react";
import Table from "@/app/components/Table/Table";
import { useEffect, useState } from "react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { connection } from "@/app/lib/utils/solana";
import * as anchor from "@coral-xyz/anchor";
import idl from "@/app/lib/utils/target/idl/degen_pools.json";
import { DegenPools } from "@/app/lib/utils/target/types/degen_pools";
import { getEntry } from "@/app/lib/utils/api/getEntry";
import { Button } from "@/app/components/Button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const columns = [
  {
    key: "optionTitle",
    label: "option",
  },
  { key: "stake", label: "Your stake" },
  { key: "claim", label: "Claim" },
];

const OptionsTable = ({ pool }: { pool: Pool }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const wallet = useWallet();
  const signer = wallet?.publicKey?.toString();
  // @ts-ignore
  const solana = window?.solana;
  const provider = new AnchorProvider(connection, solana, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(
    idl as unknown as anchor.Idl,
    provider,
  ) as unknown as anchor.Program<DegenPools>;

  const fetchEntries = async () => {
    const entrant = wallet?.publicKey;
    if (entrant !== null) {
      const entryResponses = await Promise.all(
        pool.options.map((option) =>
          getEntry(pool.id, option.id, entrant.toString()),
        ),
      );
      console.log(entryResponses.map((entryResponse) => entryResponse.data));
      setEntries(entryResponses.map((entryResponse) => entryResponse.data));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [wallet?.publicKey]);

  if (!signer || !program) {
    return (
      <div className="w-full">
        <div className="flex justify-center h-auto">
          You must connect a Solana wallet to continue!
        </div>
      </div>
    );
  }
  console.log(entries);

  const data = pool.options.map((option, index) => ({
    optionTitle: option.title,
    stake: (
      <span>
        {entries[index]?.value ? entries[index]?.value / LAMPORTS_PER_SOL : 0}{" "}
        SOL
      </span>
    ),
    claim: <Button size="small">Claim</Button>,
  }));

  return (
    <div className="w-full">
      <div className="flex justify-center h-auto">{pool.title}</div>
      <Table columns={columns} data={data} isExpandable={false} />
    </div>
  );
};

export default OptionsTable;

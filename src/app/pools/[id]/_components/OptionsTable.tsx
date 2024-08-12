"use client";
import { Entry, Pool } from "@/app/lib/utils/bets/types";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Table from "@/app/components/Table/Table";
import React, { useEffect, useState } from "react";
import { getEntry } from "@/app/lib/utils/api/getEntry";
import { Button } from "@/app/components/Button";
import { LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { claimWin } from "@/app/lib/utils/api/claimWin";

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
  const anchorWallet = useAnchorWallet();
  const signer = anchorWallet?.publicKey?.toString();

  const fetchEntries = async () => {
    const entrant = anchorWallet?.publicKey;
    if (!!entrant) {
      const entryResponses = await Promise.all(
        pool.options.map((option) =>
          getEntry(pool.id, option.id, entrant.toString()),
        ),
      );
      setEntries(entryResponses.map((entryResponse) => entryResponse.data));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [anchorWallet]);

  if (!signer) {
    return (
      <div className="w-full">
        <div className="flex justify-center h-auto">
          You must connect a Solana wallet to continue!
        </div>
      </div>
    );
  }

  const data = pool.options.map((option, index) => ({
    optionTitle: option.title,
    stake: (
      <span>
        {entries[index]?.value ? entries[index]?.value / LAMPORTS_PER_SOL : 0}{" "}
        SOL
      </span>
    ),
    claim: (
      <Button
        size="small"
        onClick={async (event) => {
          event.preventDefault();
          const entrant = anchorWallet?.publicKey;
          if (entrant) {
            const { data } = await claimWin(
              pool.id,
              option.id,
              entrant.toString(),
            );
            const transaction = Transaction.from(
              Buffer.from(data.signature, "base64"),
            );
            await anchorWallet?.signTransaction(transaction);
          }
        }}
      >
        Claim
      </Button>
    ),
  }));

  return (
    <>
      <div className="grid gap-4 md:hidden m-5 p-2">
        {pool.options.map((option, index) => (
          <div className="flex gap-4 bg-cadet-blue-dark p-1" key={option.id}>
            <div>{option.title}</div>
            <div>
              Your Stake:{" "}
              {entries[index]?.value
                ? entries[index]?.value / LAMPORTS_PER_SOL
                : 0}{" "}
              SOL
            </div>
            <div className="flex flex-col justify-center items-center">
              <Button
                size="small"
                onClick={async (event) => {
                  event.preventDefault();
                  const entrant = anchorWallet?.publicKey;
                  if (entrant) {
                    const { data } = await claimWin(
                      pool.id,
                      option.id,
                      entrant.toString(),
                    );
                    const transaction = Transaction.from(
                      Buffer.from(data.signature, "base64"),
                    );
                    await anchorWallet?.signTransaction(transaction);
                  }
                }}
              >
                Claim
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:flex flex-col justify-center items-center w-full">
        <div>{pool.title}</div>
        <br />
        <Table columns={columns} data={data} isExpandable={false} />
      </div>
    </>
  );
};

export default OptionsTable;

"use client";
import React from "react";
import { PoolsResponse } from "@/app/lib/utils/bets/types";
import Table from "@/app/components/Table/Table";
import Link from "next/link";

const columns = [
  { key: "title", label: "Pool" },
  { key: "options", label: "Options" },
  { key: "actions", label: "Actions" },
];
const PoolsTable = ({ pools }: { pools: PoolsResponse }) => {
  const data = pools.map((pool) => ({
    title: pool.title,
    options: pool.options.map((option) => option.title).join(", "),
    actions: (
      <div>
        <Link
          href={`https://dial.to/?action=solana-action:https://actions.degenmarkets.com/pools/${pool.id}`}
        >
          Participate
        </Link>
        &nbsp;|&nbsp;
        <Link href={`/pools/${pool.id}`}>Claim Win</Link>
      </div>
    ),
  }));
  return (
    <div>
      <Table columns={columns} data={data} isExpandable={false} />
    </div>
  );
};

export default PoolsTable;

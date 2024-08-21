"use client";
import React from "react";
import { PoolsResponse } from "@/app/lib/utils/bets/types";
import Table from "@/app/components/Table/Table";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";

const columns = [
  { key: "title", label: "Pool" },
  { key: "options", label: "Options" },
  { key: "actions", label: "Actions" },
];
const PoolsTable = ({ pools }: { pools: PoolsResponse }) => {
  const router = useRouter();
  const data = pools.map((pool) => ({
    title: pool.title,
    options: pool.options.map((option) => option.title).join(", "),
    actions: (
      <div className="flex items-center">
        <Button
          size="small"
          onClick={() =>
            router.push(
              `https://dial.to/?action=solana-action:https://actions.degenmarkets.com/pools/${pool.id}`,
            )
          }
        >
          Participate
        </Button>
        &nbsp;|&nbsp;
        <Button size="small" onClick={() => router.push(`/pools/${pool.id}`)}>
          View
        </Button>
      </div>
    ),
  }));
  return (
    <>
      <div className="grid gap-4 md:hidden">
        {pools.map((pool) => (
          <div className="flex gap-4 bg-cadet-blue-dark p-1" key={pool.id}>
            <div>{pool.title}</div>
            <div>{pool.options.map((option) => option.title).join(", ")}</div>
            <div className="flex flex-col justify-center items-center">
              <Button
                size="small"
                onClick={() =>
                  router.push(
                    `https://dial.to/?action=solana-action:https://actions.degenmarkets.com/pools/${pool.id}`,
                  )
                }
              >
                Participate
              </Button>
              <Button
                size="small"
                onClick={() => router.push(`/pools/${pool.id}`)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <Table columns={columns} data={data} isExpandable={false} />
      </div>
    </>
  );
};

export default PoolsTable;

import * as anchor from "@coral-xyz/anchor";
import { getPools } from "@/app/lib/utils/api/getPools";
import Table from "@/app/components/Table/Table";
import { useWallet } from "@solana/wallet-adapter-react";
import OptionsTable from "@/app/pools/[id]/_components/OptionsTable";

const Pool = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: pools } = await getPools();
  const pool = pools.find((pool) => pool.id === id);
  if (!pool) {
    return (
      <div className="flex flex-col w-full lg:w-3/4 h-auto">Unknown pool</div>
    );
  }

  return <OptionsTable pool={pool} />;
};

export default Pool;

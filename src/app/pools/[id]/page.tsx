import { getPools } from "@/app/lib/utils/api/getPools";
import OptionsTable from "@/app/pools/[id]/_components/OptionsTable";

const Pool = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: pools } = await getPools();
  const pool = pools.find((pool) => pool.id === id);
  if (!pool) {
    return <div className="flex justify-center w-full">Unknown pool</div>;
  }

  return <OptionsTable pool={pool} />;
};

export default Pool;

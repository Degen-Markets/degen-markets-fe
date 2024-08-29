import { Pool } from "@/app/lib/utils/bets/types";
import PoolCard from "./PoolCard";

const PoolsGrid = ({ pools }: { pools: Pool[] }) => (
  <>
    {pools.map((pool) => (
      <PoolCard pool={pool} key={pool.id} />
    ))}
  </>
);

export default PoolsGrid;

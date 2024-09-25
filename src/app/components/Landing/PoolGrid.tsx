import { Pool } from "@/app/lib/utils/types";
import PoolCard from "./PoolCard";

const PoolsGrid = ({ pools }: { pools: Pool[] }) => (
  <>
    {pools.map((pool) => (
      <PoolCard pool={pool} key={pool.address} />
    ))}
  </>
);

export default PoolsGrid;

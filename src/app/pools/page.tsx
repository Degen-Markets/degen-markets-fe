import { getPools } from "@/app/lib/utils/api/getPools";
import Wrapper from "@/app/components/Wrapper";
import PoolsTable from "@/app/pools/_components/PoolsTable";

const Pools = async () => {
  const { data: pools } = await getPools();
  return (
    <Wrapper className="flex w-full justify-center">
      <PoolsTable pools={pools} />
    </Wrapper>
  );
};

export default Pools;

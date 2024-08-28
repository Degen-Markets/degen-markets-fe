import { getPools } from "@/app/lib/utils/api/getPools";
import Image from "next/image";
import { getBets } from "@/app/lib/utils/api/getBets";
import { getTopTokens } from "@/app/lib/utils/api/getTopTokens";
import Wrapper from "@/app/components/Wrapper";
import BetsTab from "@/app/components/BetsTab";
import TopTokenList from "@/app/bets/_components/TopTokenList";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import PoolsTable from "@/app/pools/_components/PoolsTable";

const Pools = async () => {
  const { data: pools } = await getPools();
  console.log({
    pools,
  });
  return (
    <Wrapper className="flex w-full justify-center">
      <PoolsTable pools={pools} />
    </Wrapper>
  );
};

export default Pools;

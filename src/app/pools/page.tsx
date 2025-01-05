import { getPools } from "@/app/api/pools";
import Hero from "@/app/pools/_components/Hero";
import PoolsSection from "@/app/pools/_components/PoolsSection";
import Wrapper from "@/app/components/Wrapper";
import { PoolsResponse } from "../lib/utils/types";

export const dynamic = "auto";

const PoolsPage = async () => {
  const { data: pools } = await getPools({
    sortBy: "",
  });
  const poolsData = pools;

  return (
    <div>
      <Hero />
      <Wrapper>
        <PoolsSection initialPools={poolsData} />
      </Wrapper>
    </div>
  );
};
export default PoolsPage;

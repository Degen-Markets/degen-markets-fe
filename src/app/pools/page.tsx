import { getPools } from "@/app/api/pools";
import Hero from "@/app/pools/Hero";
import PoolsSection from "@/app/pools/PoolsSection";
import Wrapper from "@/app/components/Wrapper";

export const dynamic = "auto";

const PoolsPage = async () => {
  const { data: pools } = await getPools();
  return (
    <div>
      <Hero />
      <Wrapper>
        <PoolsSection pools={pools} />
      </Wrapper>
    </div>
  );
};
export default PoolsPage;

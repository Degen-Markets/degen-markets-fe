import { getPools } from "@/app/lib/utils/api/pools";
import Wrapper from "@/app/components/Wrapper";
import HeroSection from "@/app/components/Landing/HeroSection";
import PoolsCarouselSection from "@/app/components/Landing/PoolsCarouselSection";

export const dynamic = "force-dynamic";

const Home = async () => {
  const { data: pools } = await getPools();
  return (
    <Wrapper className="flex flex-col">
      <HeroSection />
      <PoolsCarouselSection pools={pools} />
    </Wrapper>
  );
};
export default Home;

import { getPools } from "@/app/api/pools";
import Wrapper from "@/app/components/Wrapper";
import HeroSection from "@/app/components/Landing/HeroSection";
import PoolsCarouselSection from "@/app/components/Landing/PoolsCarouselSection/PoolsCarouselSection";

export const dynamic = "force-dynamic";

const Home = async () => {
  const { data: pools } = await getPools();
  return (
    <>
      <HeroSection />
      <PoolsCarouselSection pools={pools} />
    </>
  );
};
export default Home;

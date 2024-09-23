import { getPools } from "@/app/lib/utils/api/pools";
import Wrapper from "@/app/components/Wrapper";
import HeroSection from "@/app/components/Landing/HeroSection";
import Pools from "@/app/components/Landing";

export const dynamic = "force-dynamic";

const Home = async () => {
  const { data: pools } = await getPools();
  return (
    <Wrapper className="flex flex-col gap-16">
      <HeroSection />
      <Pools pools={pools} />
    </Wrapper>
  );
};
export default Home;

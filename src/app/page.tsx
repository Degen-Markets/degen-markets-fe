import { getPools } from "@/app/lib/utils/api/pools";
import Wrapper from "@/app/components/Wrapper";
import HeroSection from "@/app/components/Landing/HeroSection";
import Pools from "@/app/components/Landing";
import Section from "@/app/components/Section";
import PoolCard from "@/app/components/PoolCard.tsx/PoolCard";

export const dynamic = "force-dynamic";

const Home = async () => {
  const { data: pools } = await getPools();
  return (
    <Wrapper className="flex flex-col">
      <HeroSection />
      <Section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PoolCard />
        <PoolCard />
        <PoolCard />
        <PoolCard />
      </Section>
      <Pools pools={pools} />
    </Wrapper>
  );
};
export default Home;

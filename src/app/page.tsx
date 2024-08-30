import Pools from "./components/Landing";
import HeroSection from "./components/Landing/HeroSection";
import StatsAndSocials from "./components/Landing/StatsAndSocial";
import Wrapper from "./components/Wrapper";
import { getPools } from "./lib/utils/api/getPools";

const Home = async () => {
  const { data: pools } = await getPools();

  return (
    <Wrapper isHome>
      <HeroSection />
      <Pools pools={pools} />
      <StatsAndSocials />
    </Wrapper>
  );
};

export default Home;

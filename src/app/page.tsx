import Pools from "./components/Landing";
import HeroSection from "./components/Landing/HeroSection";
import StatsAndSocials from "./components/Landing/StatsAndSocial";
import Wrapper from "./components/Wrapper";
import { getPools } from "./lib/utils/api/getPools";

const Home = async () => {
  const { data: pools } = await getPools();

  return (
    <div className="my-20 bg-gradient-to-t from-purple-light to-black-medium pb-40">
      <Wrapper>
        <HeroSection />
        <Pools pools={pools} />
        <StatsAndSocials />
      </Wrapper>
    </div>
  );
};

export default Home;

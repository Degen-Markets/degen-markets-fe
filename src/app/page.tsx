import Pools from "./components/Landing";
import HeroSection from "./components/Landing/HeroSection";
import LeaderBoard from "./components/Landing/LeaderBoard";
import Wrapper from "./components/Wrapper";
import { getPools } from "./lib/utils/api/getPools";

export const dynamic = "force-dynamic"; // forces Next to not cache api requests

const Home = async () => {
  const { data: pools } = await getPools();
  return (
    <Wrapper className="flex flex-col gap-16">
      <HeroSection />
      <Pools pools={pools} />
      <LeaderBoard />
    </Wrapper>
  );
};
export default Home;

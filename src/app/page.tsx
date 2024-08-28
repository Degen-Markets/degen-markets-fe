import Landing from "./components/Home/page";
import { getPools } from "./lib/utils/api/getPools";

const Home = async () => {
  const { data: pools } = await getPools();
  return <Landing pools={pools} />;
};

export default Home;

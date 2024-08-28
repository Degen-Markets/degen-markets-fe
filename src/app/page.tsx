import { Card } from "./components/Card";
import Landing from "./components/Home/page";
import Pagination from "./components/Pagination";
import { getPools } from "./lib/utils/api/getPools";

const Home = async () => {
  const { data: pools } = await getPools();
  return <Landing pools={pools} />;
};

export default Home;

import HeroSection from "./components/Landing/HeroSection";
import { getLatestPool, getPoolById } from "./api/pools";
import BlinkLoader from "./pools/[id]/BlinkLoader";
import { TabsVertical } from "./components/tabs/VerticalTab";
import Story from "./components/tabs/Story";
import { storyContent, tokenomicsData } from "./components/tabs/constant";
import TokenomicsChart from "./components/tabs/TokenomicsChart";
import Tokenomics from "./components/tabs/Tokenomics";
import CurveAnimatedChart from "./components/tabs/CurveAnimatedChart";

export const dynamic = "force-dynamic";

const Home = async () => {
  const { data: pool } = await getLatestPool({});
  const poolId = pool[0].address;
  const {
    data: { value },
  } = await getPoolById(poolId);

  const tabs = [
    {
      id: "bet",
      label: "Bet",
      content: (
        <div className="w-full max-w-2xl mx-auto">
          <BlinkLoader poolId={poolId} poolValue={value} />
        </div>
      ),
    },
    {
      id: "tokenomics",
      label: "Tokenomics",
      content: (
        <>
          {/* <Tokenomics
          totalSupply={tokenomicsData.totalSupply}
          allocations={tokenomicsData.allocations}
          /> */}
          {/* <TokenomicsChart
            totalSupply={tokenomicsData.totalSupply}
            allocations={tokenomicsData.allocations}
          /> */}
          <CurveAnimatedChart />
        </>
      ),
    },
    {
      id: "story",
      label: "Story",
      content: (
        <Story title={storyContent.title} content={storyContent.content} />
      ),
    },
  ];

  return (
    <>
      <HeroSection />
      <TabsVertical tabs={tabs} />
    </>
  );
};

export default Home;

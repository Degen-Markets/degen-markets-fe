import HeroSection from "./components/Landing/HeroSection";
import { getLatestPool, getPoolById } from "./api/pools";
import BlinkLoader from "./pools/[id]/BlinkLoader";
import { TabsVertical } from "./components/tabs/VerticalTab";
import Story from "./components/tabs/Story";
import { storyContent } from "./components/tabs/constant";
import CurveAnimatedChart from "./components/tabs/VerticalTab/Chart/CurveAnimatedChart";

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

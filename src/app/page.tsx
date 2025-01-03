import HeroSection from "./components/Landing/HeroSection";
import { getPool, getPoolById } from "./api/pools";
import BlinkLoader from "./pools/[id]/BlinkLoader";
import { FeatureTabs } from "./components/tabs/VerticalTab";
import Story from "./components/tabs/Story";
import { storyContent } from "./components/tabs/constant";
import CurveAnimatedChart from "./components/tabs/VerticalTab/Chart/CurveAnimatedChart";

export const dynamic = "force-dynamic";

const Home = async () => {
  const { data: pool } = await getPool({
    sortBy: "newest",
  });
  console.log(pool);
  const poolId = pool[0].address;
  const {
    data: { value },
  } = await getPoolById(poolId);

  const tabs = [
    {
      id: "story",
      label: "Story",
      content: (
        <Story title={storyContent.title} content={storyContent.content} />
      ),
    },
    {
      id: "tokenomics",
      label: "Tokenomics",
      content: <CurveAnimatedChart />,
    },
    {
      id: "bet",
      label: "Bet",
      content: (
        <div className="w-full max-w-2xl mx-auto">
          <BlinkLoader poolId={poolId} poolValue={value} />
        </div>
      ),
    },
  ];

  return (
    <>
      <HeroSection />
      <FeatureTabs tabs={tabs} />
    </>
  );
};

export default Home;

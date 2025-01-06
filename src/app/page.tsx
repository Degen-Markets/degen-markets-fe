import HeroSection from "./components/Landing/HeroSection";
import { getPoolById } from "./api/pools";
import BlinkLoader from "./pools/[id]/BlinkLoader";
import { FeatureTabs } from "./components/tabs/VerticalTab";
import Story from "./components/tabs/Story";
import { storyContent } from "./components/tabs/constant";
import CurveAnimatedChart from "./components/tabs/VerticalTab/Chart/CurveAnimatedChart";

export const dynamic = "force-dynamic";

const featuredPoolId = "FNyJQZa1QeXAxEwsQA7uV42QD4XfECV2zJq1Z9pHh2Jr";

const Home = async () => {
  const {
    data: { value },
  } = await getPoolById(featuredPoolId);

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
          <BlinkLoader poolId={featuredPoolId} poolValue={value} />
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

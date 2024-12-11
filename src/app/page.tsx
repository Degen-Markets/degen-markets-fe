import { getLatestPool, getPoolById } from "@/app/api/pools";
import HeroSection from "@/app/components/Landing/HeroSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs/tabs";
import BlinkLoader from "./pools/[id]/BlinkLoader";

export const dynamic = "force-dynamic";

const Home = async () => {
  // const { data: pools } = await getPools();
  const { data: pool } = await getLatestPool({});
  const poolId = pool[0].address;
  console.log({
    listenToLatestPool: pool,
  });
  const {
    data: { value },
  } = await getPoolById(poolId);

  return (
    <>
      <HeroSection />

      <>
        <Tabs className="w-full" defaultValue="active">
          <TabsList className="!flex">
            <TabsTrigger value="active" className="flex flex-1">
              Bet
            </TabsTrigger>
            <TabsTrigger value="inactive" className="flex flex-1">
              Tokenimic
            </TabsTrigger>
            <TabsTrigger value="inactive" className="flex flex-1">
              Story
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <BlinkLoader poolId={poolId} poolValue={value} />
          </TabsContent>
          <TabsContent value="inactive"> Tokenimic </TabsContent>
          <TabsContent value="inactive"> Story</TabsContent>
        </Tabs>
      </>
      {/* <PoolsCarouselSection pools={pools} /> */}
    </>
  );
};
export default Home;

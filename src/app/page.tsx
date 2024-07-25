import TopWidgets from "@/app/home/_sections/TopWidgets";
import Wrapper from "@/app/components/Wrapper";
import Activities from "@/app/home/_sections/Activities";
import PlatformStats from "@/app/home/_sections/PlatformStats";

const Home = () => {
  return (
    <Wrapper className="text-white">
      <div className="flex flex-col gap-14">
        <TopWidgets />
        <Activities />
        <PlatformStats />
      </div>
    </Wrapper>
  );
};

export default Home;

import RecentActivity from "@/app/bets/_components/RecentActivity";
import BetsTab from "@/app/bets/_components/BetsTab";
import Wrapper from "@/app/components/Wrapper";

const Bets = async () => {
  return (
    <Wrapper className="flex">
      <div className="flex flex-col md:w-3/4 md:pr-4">
        <BetsTab />
      </div>
      <div className="hidden lg:flex md:w-1/4">
        <RecentActivity />
      </div>
    </Wrapper>
  );
};

export default Bets;

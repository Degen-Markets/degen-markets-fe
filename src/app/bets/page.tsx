import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";
import { getBets } from "@/app/lib/utils/api/getBets";
import { getTopTokens } from "../lib/utils/api/getTopTokens";
import TopTokenList from "./_components/TopTokenList";
const Bets = async () => {
  const { data: fetchedBets } = await getBets();
  const { data: fetchedTopTokens } = await getTopTokens(5);
  return (
    <Wrapper className="flex">
      <div className="flex flex-col w-full lg:w-3/4 h-auto">
        <BetsTab bets={fetchedBets} />
      </div>
      <div className="hidden lg:flex lg:w-2/6 flex-col h-[95vh] overflow-y-auto sticky top-5 mt-4 ">
        <TopTokenList tickers={fetchedTopTokens} />
        <RecentActivity />
      </div>
    </Wrapper>
  );
};

export default Bets;

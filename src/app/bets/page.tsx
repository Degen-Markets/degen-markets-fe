import RecentActivity from "@/app/bets/_components/RecentActivity";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";
import { getBets } from "@/app/lib/utils/api/getBets";
import { getTopTokens } from "../lib/utils/api/getTopTokens";
import TopTokenList from "./_components/TopTokenList";
export const dynamic = "force-dynamic"; // forces Next to not cache api requests
const Bets = async () => {
  const { data: fetchedBets } = await getBets();
  const { data: fetchedTopTokens } = await getTopTokens(5);
  return (
    <Wrapper className="flex">
      <div className="flex flex-col w-full lg:w-3/4 h-auto">
        <BetsTab bets={fetchedBets} />
      </div>
      <div className="hidden lg:flex lg:w-2/6 flex-col">
        <TopTokenList tickers={fetchedTopTokens} />
        <RecentActivity />
      </div>
    </Wrapper>
  );
};

export default Bets;

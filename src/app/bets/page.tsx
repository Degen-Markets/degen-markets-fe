import RecentActivity from "@/app/bets/_components/RecentActivity";
import BetsTab from "@/app/components/BetsTab";
import Wrapper from "@/app/components/Wrapper";
import { getBets } from "@/app/lib/utils/api/getBets";
export const dynamic = "force-dynamic"; // forces Next to not cache api requests
const Bets = async () => {
  const { data: fetchedBets } = await getBets();
  return (
    <Wrapper className="flex">
      <div className="flex flex-col w-full lg:w-3/4 md:pr-4">
        <BetsTab bets={fetchedBets} />
      </div>
      <div className="hidden lg:flex lg:w-1/4">
        <RecentActivity />
      </div>
    </Wrapper>
  );
};

export default Bets;

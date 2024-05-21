import { BetsResponse } from "@/app/lib/utils/bets/types";
import { getBets } from "@/app/lib/utils/api/getBets";
import BetCard from "@/app/components/BetCard";
import RecentActivity from "@/app/bets/_components/RecentActivity";
import {
  isBetOpen,
  isBetRunning,
  isBetConcluded,
} from "@/app/lib/utils/bets/helpers";
import BetsTab from "@/app/bets/_components/BetsTab";

const Bets = async () => {
  const { data: fetchedBets } = await getBets();
  const unacceptedBets = fetchedBets.filter(isBetOpen);
  const runningBets = fetchedBets.filter(isBetRunning);
  const concludedBets = fetchedBets.filter(isBetConcluded);

  return (
    <div className="flex">
      <div className="flex flex-col md:w-3/4 h-screen overflow-y-scroll">
        <BetsTab />
        {unacceptedBets.length > 0 && (
          <>
            <div className="text-center text-4xl md:text-7xl">
              Accept the challenge
            </div>
            <div className="p-5 flex flex-wrap gap-5 justify-center">
              {unacceptedBets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </>
        )}
        {runningBets.length > 0 && (
          <>
            <div className="text-center text-4xl md:text-7xl">
              Current battles
            </div>
            <div className="p-5 flex flex-wrap gap-5 justify-center">
              {runningBets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </>
        )}
        <div className="text-center text-4xl md:text-7xl">Payouts</div>
        <div className="p-5 flex flex-wrap gap-5 justify-center">
          {concludedBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      </div>
      <div className="hidden lg:flex md:w-1/4">
        <RecentActivity />
      </div>
    </div>
  );
};

export default Bets;

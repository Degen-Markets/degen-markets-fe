import { TfiStatsUp } from "react-icons/tfi";
import { getPlatformStats } from "@/app/lib/utils/api/getPlatformStats";
import { IoIosPeople } from "react-icons/io";
import StatWidget from "@/app/components/StatWidget";
import { FaEthereum } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";

const PlatformStats = async () => {
  const { data: stats } = await getPlatformStats();
  return (
    <div>
      <header className="flex gap-x-4 text-xl lg:text-5xl font-bold pb-4 mb-8 border-b border-white w-full">
        <TfiStatsUp />
        <span className="drop-shadow-md">Platform stats</span>
      </header>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-24">
        <StatWidget
          title="Games Played"
          total={stats.bets}
          icon={<IoIosPeople className="text-4xl" />}
        />
        <StatWidget
          title="Bet Creators"
          total={stats.creators}
          icon={<FaEthereum className="text-4xl" />}
        />
        <StatWidget
          title="Bet Acceptors"
          total={stats.acceptors}
          icon={<IoGameController className="text-4xl" />}
        />
      </div>
    </div>
  );
};

export default PlatformStats;

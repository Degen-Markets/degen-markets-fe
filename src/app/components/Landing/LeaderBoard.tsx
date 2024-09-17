import SectionHeader from "./SectionHeading";
import LeaderboardIcon from "@/app/components/Icons/LeaderboardIcon";
import LeaderboardTable from "@/app/components/LeaderboardTable/LeaderboardTable";
import { getPlayers } from "@/app/lib/utils/api/players";

const LeaderBoard = async () => {
  const { data: players } = await getPlayers();
  return (
    <>
      <SectionHeader
        icon={<LeaderboardIcon width={64} height={64} />}
        title="LeaderBoard"
      />
      <div className="bg-white bg-opacity-5 p-6 md:p-10 bg-no-repeat bg-contain bg-center rounded-xl py-10 mb-20">
        <LeaderboardTable players={players} />
      </div>
    </>
  );
};

export default LeaderBoard;

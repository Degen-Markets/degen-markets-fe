import SectionHeader from "./SectionHeading";
import LeaderboardIcon from "@/app/components/Icons/LeaderboardIcon";

const LeaderBoard = () => (
  <div className="">
    <SectionHeader
      icon={<LeaderboardIcon width="64" height="64" />}
      title="LeaderBoard"
    />
    <div className="bg-white bg-opacity-5 p-6 md:p-10 bg-no-repeat bg-contain bg-center rounded-xl py-10 mb-20"></div>
  </div>
);

export default LeaderBoard;

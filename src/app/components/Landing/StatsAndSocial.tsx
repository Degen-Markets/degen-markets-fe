import Image from "next/image";
import SectionHeader from "./SectionHeading";

const LeaderBoard = () => (
  <div className="">
    <SectionHeader
      icon={
        <Image
          src={"/icons/leaderboard-icon.svg"}
          alt="LeaderBoard"
          width={48}
          height={48}
        />
      }
      title="LeaderBoard"
    />
    <div className="bg-white bg-opacity-5 p-10 bg-no-repeat bg-contain bg-center rounded-xl py-10 mb-20"></div>
  </div>
);

export default LeaderBoard;

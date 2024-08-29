import Image from "next/image";
import SectionHeader from "./SectionHeading";

const StatsAndSocials = () => (
  <div className="grid md:grid-cols-12 gap-20">
    <div className="md:col-span-7">
      <SectionHeader
        icon={
          <Image
            src={"/navIcons/leaderBoard.svg"}
            alt="LeaderBoard"
            width={35}
            height={35}
          />
        }
        title="LeaderBoard"
      />
      <div className="bg-black-medium bg-opacity-90 p-10 rounded-xl py-10 h-full min-h-96">
        Top Bets
      </div>
    </div>
    <div className="md:col-span-5">
      <SectionHeader title="Social" />
      <div className="bg-black-medium bg-opacity-90 p-10 rounded-xl py-10 h-full min-h-96">
        Twitters
      </div>
    </div>
  </div>
);

export default StatsAndSocials;

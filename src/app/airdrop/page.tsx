import Wrapper from "@/app/components/Wrapper";
import LeaderBoard from "@/app/airdrop/LeaderBoard";
import { getPlayers } from "@/app/api/players";
import TopThree from "@/app/airdrop/TopThree";
import Hero from "@/app/airdrop/Hero";

export const dynamic = "force-dynamic";

const AirdropPage = async () => {
  const { data: players } = await getPlayers();
  const [player1, player2, player3, ...otherPlayers] = players;
  const topThreePlayers = [player1, player2, player3];

  return (
    <Wrapper className="flex flex-col gap-10 lg:gap-16 ">
      <Hero />
      <div className="flex flex-col gap-10 lg:gap-20 lg:px-[10%] ">
        <TopThree players={topThreePlayers} />
        <LeaderBoard players={otherPlayers} />
      </div>
    </Wrapper>
  );
};
export default AirdropPage;

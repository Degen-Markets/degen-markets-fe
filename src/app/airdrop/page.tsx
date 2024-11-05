import Wrapper from "@/app/components/Wrapper";
import { getPlayers } from "@/app/api/players";
import Hero from "@/app/airdrop/Hero";
import PaginatedLeaderboard from "./PaginatedLeaderBoard";
import { PLAYERS_PER_PAGE } from "../components/Pagination/constants";

export const dynamic = "force-dynamic";

const AirdropPage = async () => {
  // Fetch initial data
  const { data: initialPlayers } = await getPlayers({
    limit: PLAYERS_PER_PAGE,
    offset: 0,
  });

  return (
    <Wrapper className="flex flex-col gap-10 lg:gap-16">
      <Hero />
      <div className="flex flex-col lg:px-[10%]">
        <PaginatedLeaderboard initialPlayers={initialPlayers} />
      </div>
    </Wrapper>
  );
};

export default AirdropPage;

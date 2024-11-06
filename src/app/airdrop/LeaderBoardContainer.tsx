"use client";

import { useEffect, useState } from "react";
import { Player } from "../types/player";
import { getPlayers } from "../api/players";
import TopThree from "./TopThree";
import PlayerSkeletonLoader from "../Skeleton/PlayerSkeletonLoader";
import { PLAYERS_PER_PAGE } from "../components/Pagination/constants";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer/InfiniteScrollContainer";
import LeaderboardTableRow from "./LeaderboardTableRow";

interface LeaderBoardContainerProps {
  initialPlayers: Player[];
}

const LeaderBoardContainer = ({
  initialPlayers,
}: LeaderBoardContainerProps) => {
  const [topThreePlayers, setTopThreePlayers] = useState<Player[]>([]);

  useEffect(() => {
    setTopThreePlayers(initialPlayers.slice(0, 3));
  }, [initialPlayers]);

  const fetchPlayers = async (page: number) => {
    // Skip the first page fetch since we already have it from initialData
    if (page === 1) {
      return initialPlayers.slice(3);
    }

    const offset = (page - 1) * PLAYERS_PER_PAGE;
    const response = await getPlayers({
      limit: PLAYERS_PER_PAGE,
      offset,
    });
    return response.data || [];
  };

  const renderPlayer = (data: Player[]) => {
    return (
      <section>
        <div className="w-full text-sm text-left mt-10 lg:mt">
          <div className="text-xs text-lavender-blue">
            <div className="grid grid-cols-5">
              <div className="px-2 md:px-6 py-3 col-span-1">Place</div>
              <div className="px-6 py-3 col-span-3">Username</div>
              <div className="px-2 md:px-6 py-3 col-span-1">Points</div>
            </div>
          </div>
          <div>
            {data.map((player, index) => {
              const playerRank = index + 3;
              return (
                <LeaderboardTableRow
                  key={`${playerRank}:${player.address}`}
                  player={player}
                  index={playerRank}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <TopThree players={topThreePlayers} />
      <InfiniteScrollContainer
        initialData={initialPlayers.slice(3)} // Start from the fourth player
        fetchData={fetchPlayers}
        renderSection={(data) => renderPlayer(data)}
        SkeletonLoader={<PlayerSkeletonLoader />}
      />
    </>
  );
};

export default LeaderBoardContainer;

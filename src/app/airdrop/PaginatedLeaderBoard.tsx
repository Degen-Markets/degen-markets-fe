"use client";

import { useEffect, useState } from "react";
import { Player } from "../types/player";
import { getPlayers } from "../api/players";
import TopThree from "./TopThree";
import PlayerSkeletonLoader from "../Skeleton/PlayerSkeletonLoader";
import { PLAYERS_PER_PAGE } from "../components/Pagination/constants";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer/InfiniteScrollContainer";
import LeaderboardTableRow from "./LeaderboardTableRow";

interface PaginatedLeaderboardProps {
  initialPlayers: Player[];
}

const PaginatedLeaderboard = ({
  initialPlayers,
}: PaginatedLeaderboardProps) => {
  const [topThreePlayers, setTopThreePlayers] = useState<Player[]>([]);

  useEffect(() => {
    const [p1, p2, p3] = initialPlayers;
    setTopThreePlayers([p1, p2, p3]);
  }, [initialPlayers]);

  const fetchPlayers = async (page: number) => {
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
            {data.map((player, index) => (
              <LeaderboardTableRow
                key={player.address + index}
                player={player}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <TopThree players={topThreePlayers} />
      <InfiniteScrollContainer
        initialData={initialPlayers}
        fetchData={fetchPlayers}
        renderSection={(data) => renderPlayer(data)}
        SkeletonLoader={<PlayerSkeletonLoader />}
      />
    </>
  );
};

export default PaginatedLeaderboard;

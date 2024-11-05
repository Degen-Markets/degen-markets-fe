"use client";

import { useCallback, useEffect, useState } from "react";
import { Player } from "../types/player";
import { getPlayers } from "../api/players";
import LeaderBoard from "./LeaderBoard";
import TopThree from "./TopThree";
import Pagination from "../components/Pagination/Pagination";
import PlayerSkeletonLoader from "../components/Pagination/PlayerSkeletonLoader";
import { PLAYERS_PER_PAGE } from "../components/Pagination/constants";

interface PaginatedLeaderboardProps {
  initialPlayers: Player[];
}

const PaginatedLeaderboard = ({
  initialPlayers,
}: PaginatedLeaderboardProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [topThreePlayers, setTopThreePlayers] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const [p1, p2, p3, ...others] = initialPlayers;
    setTopThreePlayers([p1, p2, p3]);
    setPlayers(others);
    setTotalPages(Math.ceil(100 / PLAYERS_PER_PAGE)); // Replace 100 with actual total count need to get from the backend later.
  }, [initialPlayers]);

  const fetchPlayers = useCallback(async (page: number) => {
    if (page === 1) return; // Skip fetching if it's the first page (we already have the data)

    try {
      setIsLoading(true);
      const offset = (page - 1) * PLAYERS_PER_PAGE;
      const { data: fetchedPlayers } = await getPlayers({
        limit: PLAYERS_PER_PAGE,
        offset,
      });

      setPlayers(fetchedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      fetchPlayers(currentPage);
    }
  }, [currentPage, fetchPlayers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // player index offset only for pages after the first
  const playerIndexOffset =
    currentPage === 1 ? 0 : (currentPage - 1) * PLAYERS_PER_PAGE;

  return (
    <>
      <TopThree players={topThreePlayers} />
      {isLoading ? (
        <PlayerSkeletonLoader />
      ) : (
        <LeaderBoard players={players} indexOffset={playerIndexOffset} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PaginatedLeaderboard;

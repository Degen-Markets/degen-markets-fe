"use client";

import { useMemo } from "react";
import { Player } from "../types/player";
import TopThree from "./TopThree";
import PlayerSkeletonLoader from "../components/Skeletons/PlayerSkeletonLoader";
import { PLAYERS_PER_PAGE } from "../components/InfiniteScrollContainer/constants";
import LeaderboardTableRow from "./LeaderboardTableRow";
import { usePlayersQuery } from "../hooks/usePlayerQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import LeaderBoardError from "./LeaderBoardError";

interface LeaderBoardContainerProps {
  initialPlayers?: Player[];
}

const LeaderBoardContainer = ({
  initialPlayers = [],
}: LeaderBoardContainerProps) => {
  const { data, fetchNextPage, hasNextPage, status } = usePlayersQuery({
    initialPlayers,
  });

  const topThreePlayers = useMemo(
    () => initialPlayers.slice(0, 3),
    [initialPlayers],
  );

  const renderLeaderboardHeader = () => (
    <div className="text-xs text-lavender-blue">
      <div className="grid grid-cols-5">
        <div className="px-2 md:px-6 py-3 col-span-1">Place</div>
        <div className="px-6 py-3 col-span-3">Username</div>
        <div className="px-2 md:px-6 py-3 col-span-1">Points</div>
      </div>
    </div>
  );

  if (status === "pending") return <PlayerSkeletonLoader />;
  if (status === "error") return <LeaderBoardError />;

  const renderPlayers = () => {
    return data.pages.map((page, pageIndex) => (
      <div key={pageIndex}>
        {page.data.map((player: Player, index: number) => {
          const playerRank = index + 3 + pageIndex * PLAYERS_PER_PAGE;
          return (
            <LeaderboardTableRow
              key={`${playerRank}:${player.address}`}
              player={player}
              index={playerRank}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <TopThree players={topThreePlayers} />
      <section>
        <div className="w-full text-sm text-left mt-10 lg:mt-20">
          {renderLeaderboardHeader()}

          <InfiniteScroll
            style={{ overflow: "initial" }}
            dataLength={data.pages.reduce(
              (acc, page) => acc + page.data.length,
              0,
            )} // total players
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<PlayerSkeletonLoader />}
            endMessage={
              !hasNextPage && (
                <p className="mt-8 text-sm md:text-base text-lavender-blue text-center">
                  No more data available.
                </p>
              )
            }
          >
            {renderPlayers()}
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export default LeaderBoardContainer;

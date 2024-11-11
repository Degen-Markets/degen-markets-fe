import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlayers } from "../api/players";
import { PLAYERS_PER_PAGE } from "../components/InfiniteScrollContainer/constants";
import { Player } from "../types/player";

interface UsePlayersQueryProps {
  initialPlayers?: Player[];
}

export function usePlayersQuery({ initialPlayers = [] }: UsePlayersQueryProps) {
  return useInfiniteQuery({
    queryKey: ["players", initialPlayers.length],
    queryFn: async ({ pageParam = 1 }) => {
      if (pageParam === 1 && initialPlayers.length > 0) {
        return {
          data: initialPlayers.slice(3),
          nextPage: 2,
          hasMore: initialPlayers.length >= PLAYERS_PER_PAGE,
        };
      }

      const offset = (pageParam - 1) * PLAYERS_PER_PAGE;
      const response = await getPlayers({
        limit: PLAYERS_PER_PAGE,
        offset,
      });

      return {
        data: response.data,
        nextPage: pageParam + 1,
        hasMore: response.data.length >= PLAYERS_PER_PAGE,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    staleTime: 2 * 60 * 1000, // Cache for 2 minute
  });
}

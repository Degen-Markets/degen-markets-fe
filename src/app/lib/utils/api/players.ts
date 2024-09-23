import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/app/lib/utils/api/index";
import { Player } from "@/app/types/player";

type GetPlayersParams = {
  sort?: "ASC" | "DESC";
  limit?: number;
  offset?: number;
};

export const getPlayers = ({
  sort = "DESC",
  limit = 20,
  offset = 0,
}: GetPlayersParams = {}): Promise<AxiosResponse<Array<Player>>> =>
  axios.get(`${API_BASE_URL}/players`, {
    params: {
      [`points:${sort}`]: true,
      limit,
      offset,
    },
  });

export const getPlayerById = (
  address: string,
): Promise<AxiosResponse<Player>> =>
  axios.get(`https://api.degenmarkets.com/players/${address}`);

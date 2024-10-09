import axios, { AxiosResponse } from "axios";
import { Player } from "@/app/types/player";
import { API_BASE_URL } from "@/app/config/api";

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
): Promise<AxiosResponse<Player | null>> =>
  axios.get(`https://api.degenmarkets.com/players/${address}`);

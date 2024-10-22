import axios, { AxiosResponse } from "axios";
import { Player } from "@/app/types/player";
import { API_BASE_URL } from "@/app/config/api";
import { tryItAsync } from "../lib/utils/tryIt";

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

export const getPlayerById = async (
  address: string,
): Promise<Player | null> => {
  const trial = await tryItAsync(async () =>
    axios.get<Player>(`${API_BASE_URL}/players/${address}`),
  );
  if (!trial.success) {
    console.error(trial.err);
    return null;
  }

  return trial.data.data;
};

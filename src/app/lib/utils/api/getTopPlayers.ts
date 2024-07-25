import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/app/lib/utils/api/index";
import { Player } from "@/app/types/player";

export const getTopPlayers = (
  limit: number,
): Promise<AxiosResponse<Player[]>> =>
  axios.get(
    `${API_BASE_URL}/players?sort=betCount:DESC&limit${limit}&offset=0`,
  );

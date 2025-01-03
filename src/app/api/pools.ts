import axios, { AxiosResponse } from "axios";
import { Pool, PoolsResponse } from "@/app/lib/utils/types";

import { API_BASE_URL } from "@/app/config/api";

type GetLatestPoolParams = {
  status?: "ongoing" | "completed";
  sortBy?: "highestVolume" | "lowestVolume";
  limit?: string;
  offset?: string;
};

export const getPools = (): Promise<AxiosResponse<PoolsResponse>> =>
  axios.get(`${API_BASE_URL}/pools`);

export const getLatestPool = ({
  status = "ongoing",
  sortBy = "highestVolume",
  limit = "1",
  offset = "0",
}: GetLatestPoolParams): Promise<AxiosResponse<PoolsResponse>> => {
  return axios.get(`${API_BASE_URL}/pools`, {
    params: {
      status,
      sortBy,
      limit,
      offset,
    },
  });
};

export const getPoolById = (id: string): Promise<AxiosResponse<Pool>> =>
  axios.get(`${API_BASE_URL}/pools/${id}`);

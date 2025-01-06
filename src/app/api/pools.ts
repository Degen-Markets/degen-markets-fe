import axios, { AxiosResponse } from "axios";
import { Pool, PoolsResponse } from "@/app/lib/utils/types";

import { API_BASE_URL } from "@/app/config/api";

export type Status = "ongoing" | "completed";
export type SortBy = "highestVolume" | "newest";

type GetPoolParams = {
  status?: Status;
  sortBy?: SortBy;
  limit?: string;
  offset?: string;
};

export const getPoolById = (id: string): Promise<AxiosResponse<Pool>> =>
  axios.get(`${API_BASE_URL}/pools/${id}`);

export const getPools = ({
  status,
  sortBy,
  limit,
  offset,
}: GetPoolParams = {}): Promise<AxiosResponse<PoolsResponse>> =>
  axios.get(`${API_BASE_URL}/pools`, {
    params: {
      status,
      sortBy,
      limit,
      offset,
    },
  });

import axios, { AxiosResponse } from "axios";
import { Pool, PoolsResponse } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getPools = (): Promise<AxiosResponse<PoolsResponse>> =>
  axios.get(`${API_BASE_URL}/pools`);

export const getPoolById = (id: string): Promise<AxiosResponse<Pool>> =>
  axios.get(`${API_BASE_URL}/pools/${id}`);

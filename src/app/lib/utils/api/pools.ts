import axios, { AxiosResponse } from "axios";
import { Pool, PoolsResponse, PoolWithOptions } from "@/app/lib/utils/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getPools = (): Promise<AxiosResponse<PoolsResponse>> =>
  axios.get(`${API_BASE_URL}/pools`);

export const getPoolById = (
  address: string,
): Promise<AxiosResponse<PoolWithOptions>> =>
  axios.get(`${API_BASE_URL}/pools/${address}`);

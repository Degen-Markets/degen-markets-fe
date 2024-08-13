import { API_BASE_URL } from "@/app/lib/utils/api/index";
import axios, { AxiosResponse } from "axios";
import { PoolAccount } from "@/app/lib/utils/bets/types";

export const getPoolAccount = (
  poolId: string,
): Promise<AxiosResponse<PoolAccount>> =>
  axios.get(`${API_BASE_URL}/pool-accounts/${poolId}`);

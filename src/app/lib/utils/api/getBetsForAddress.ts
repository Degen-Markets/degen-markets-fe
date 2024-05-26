import axios, { AxiosResponse } from "axios";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getBetsForAddress = (
  address: `0x${string}`,
): Promise<AxiosResponse<BetsResponse>> =>
  axios.get(`${API_BASE_URL}/bets?address=${address}`);

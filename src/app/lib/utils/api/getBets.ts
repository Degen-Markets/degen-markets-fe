import axios, { AxiosResponse } from "axios";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getBets = (): Promise<AxiosResponse<BetsResponse>> =>
  axios.get(`${API_BASE_URL}/bets`);

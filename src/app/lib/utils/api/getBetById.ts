import axios, { AxiosResponse } from "axios";
import { BetResponse, BetsResponse } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getBetById = (id: string): Promise<AxiosResponse<BetResponse>> =>
  axios.get(`${API_BASE_URL}/bets/${id}`);

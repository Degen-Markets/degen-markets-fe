import axios, { AxiosResponse } from "axios";
import { BetsResponse, TopToken } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getTopTokens = (
  number: number,
): Promise<AxiosResponse<TopToken[]>> =>
  axios.get(`${API_BASE_URL}/tickers?limit${number}`);

import axios, { AxiosResponse } from "axios";
import { BetsResponse } from "@/app/lib/utils/bets/types";

export const getBets = (): Promise<AxiosResponse<BetsResponse>> =>
  axios.get("https://api.degenmarkets.com/bets");

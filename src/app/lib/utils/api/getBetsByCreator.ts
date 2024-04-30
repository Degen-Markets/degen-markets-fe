import axios, { AxiosResponse } from "axios";
import { BetsResponse } from "@/app/lib/utils/bets/types";

export const getBetsByCreator = (
  address: `0x${string}`,
): Promise<AxiosResponse<BetsResponse>> =>
  axios.get(`https://api.degenmarkets.com/bets?creator=${address}`);

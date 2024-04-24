import axios, { AxiosResponse } from "axios";
import { BetsResponse } from "@/app/lib/utils/bets/types";

export const getBets = (): Promise<AxiosResponse<BetsResponse>> =>
  axios.get("http://ec2-52-49-142-79.eu-west-1.compute.amazonaws.com/bets");

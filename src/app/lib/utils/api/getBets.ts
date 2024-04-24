import axios, { AxiosResponse } from "axios";
import { BetsResponse } from "@/app/lib/utils/bets/types";

export const getBets = (): Promise<AxiosResponse<BetsResponse>> =>
  axios.get("http://bets-backend-1257565388.eu-west-1.elb.amazonaws.com/bets");

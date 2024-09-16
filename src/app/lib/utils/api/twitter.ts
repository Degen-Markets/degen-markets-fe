import { Player } from "@/app/types/player";
import axios, { AxiosResponse } from "axios";

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>("https://api.degenmarkets.com/twitter-login");

export const saveTwitterProfile = (
  twitterCode: string,
  signature: string,
  address: string,
): Promise<AxiosResponse<Player>> =>
  axios.post("https://api.degenmarkets.com/save-twitter-profile", {
    twitterCode,
    signature,
    address,
  });

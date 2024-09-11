import axios from "axios";
import { SaveProfileData } from "./types";

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>("https://api.degenmarkets.com/twitter-login");

export const saveTwitterProfile = (
  twitterCode: string,
  signature: string,
  address: string,
): Promise<SaveProfileData> =>
  axios.post("https://api.degenmarkets.com/save-twitter-profile", {
    twitterCode,
    signature,
    address,
  });

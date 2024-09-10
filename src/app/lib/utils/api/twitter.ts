import axios from "axios";

export interface SaveTwitterProfileProps {
  address: string;
  points: number;
  twitterUsername: string;
  twitterPfpUrl: string;
}

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>("https://api.degenmarkets.com/twitter-login");

export const saveTwitterProfile = (
  twitterCode: string,
  signature: string,
  address: string,
): Promise<SaveTwitterProfileProps> =>
  axios.post("https://api.degenmarkets.com/save-twitter-profile", {
    twitterCode,
    signature,
    address,
  });

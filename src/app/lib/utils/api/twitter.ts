import { Player } from "@/app/types/player";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from ".";

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>(`${API_BASE_URL}/twitter-login`);

export const saveTwitterProfile = (
  twitterCode: string,
  signature: string,
  address: string,
): Promise<AxiosResponse<Player>> =>
  axios.post(`${API_BASE_URL}/save-twitter-profile`, {
    twitterCode,
    signature,
    address,
  });

export const claimPoolTweetPoints = ({
  tweetUrl,
}: {
  tweetUrl: string;
}): Promise<{
  message: string;
  pointsAwarded: number;
  authorUsername: string | null;
}> =>
  axios
    .post(`${API_BASE_URL}/claim-pool-tweet-points`, { tweetUrl })
    .then((res) => res.data);

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
  poolId,
  playerAddress,
}: {
  tweetUrl: string;
  poolId: string;
  playerAddress: string;
}): Promise<{ message: string; pointsAwarded: number }> =>
  axios
    .post(`${API_BASE_URL}/claim-pool-tweet-points`, {
      poolId,
      tweetUrl,
      playerAddress,
    })
    .then((res) => res.data);

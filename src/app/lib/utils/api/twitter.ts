import axios from "axios";

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>("https://api.degenmarkets.com/twitter-login");

export const saveTwitterProfile = (
  twitterCode: string,
  signature: string,
  address: string,
) =>
  axios.post("https://api.degenmarkets.com/save-twitter-profile", {
    twitterCode,
    signature,
    address,
  });

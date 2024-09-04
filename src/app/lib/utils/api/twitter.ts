import axios from "axios";

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>("https://api.degenmarkets.com/twitter-login");

export const saveTwitterUser = (twitterCode: string) =>
  axios.post("https://api.degenmarkets.com/save-twitter-user", { twitterCode });

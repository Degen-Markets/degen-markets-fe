import axios from "axios";

export const getTwitterLoginLink = () =>
  axios.get<{ url: string }>("https://api.degenmarkets.com/twitter-login");

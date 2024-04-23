import axios, { AxiosResponse } from "axios";

const apiKey = "458a12c1-9d91-4147-99fd-c604dc37471b";

export const getETHPrice = (): Promise<AxiosResponse<{ rate: number }>> => {
  return axios.post(
    "https://api.livecoinwatch.com/coins/single",
    { currency: "USD", code: "ETH", meta: false },
    {
      headers: {
        ["content-type"]: "application/json",
        ["x-api-key"]: apiKey,
      },
    },
  );
};

import axios, { AxiosResponse } from "axios";

const apiKey = "458a12c1-9d91-4147-99fd-c604dc37471b";

const getETHPrice = async (): Promise<{
  rate: number | null;
  error: boolean;
}> => {
  try {
    const response: AxiosResponse<{ rate: number }> = await axios.post(
      "https://api.livecoinwatch.com/coins/single",
      { currency: "USD", code: "ETH", meta: false },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      },
    );
    return { rate: response.data.rate, error: false };
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return { rate: null, error: true };
  }
};

export default getETHPrice;

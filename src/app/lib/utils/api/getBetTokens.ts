import axios, { AxiosResponse } from "axios";
import {
  BetsResponse,
  ListedTopTokensProps,
  ResponseLiveCoin,
  TopToken,
} from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

const apiKey = "458a12c1-9d91-4147-99fd-c604dc37471b";

export const getListedTopTokens = async (
  number: number,
): Promise<ListedTopTokensProps> => {
  try {
    const degenTickerTokens = await axios.get(
      `${API_BASE_URL}/tickers?limit=${number}`,
    );
    const tickers = degenTickerTokens.data.map((data: TopToken) => data.ticker);
    const response: AxiosResponse<ResponseLiveCoin[]> = await axios.post(
      "https://api.livecoinwatch.com/coins/map",
      { currency: "USD", codes: tickers, meta: true },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      },
    );
    const topCoins = response.data.filter((data) => data.rate).reverse();
    const returnData: ListedTopTokensProps = {
      liveCoinsToken: topCoins.length ? topCoins : [],
      topTokens: degenTickerTokens.data.length ? degenTickerTokens.data : [],
      error: false,
    };
    return returnData;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return { liveCoinsToken: [], error: true, topTokens: [] };
  }
};

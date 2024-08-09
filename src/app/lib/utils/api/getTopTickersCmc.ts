import axios, { AxiosResponse } from "axios";
import {
  Status,
  TickerCmcApiData,
  TickerCmcApiResponse,
} from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from ".";

const cmcApiKey = "9055cf1c-8db2-48e1-82a4-57a66640f7c9";
export const getTopTickersCmc = async (): Promise<{
  tickerCmcResponse: TickerCmcApiData | null;
  fetchError: Status | undefined;
}> => {
  let fetchError;
  try {
    const degenTickerTokens = await axios.get(`${API_BASE_URL}/tickers`);

    const tickerIds = degenTickerTokens.data;
    const tickerCmcIds = tickerIds
      .map((item: { id: number; ticker: string }) => item.id)
      .join(",");

    const response: AxiosResponse<TickerCmcApiResponse> = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${tickerCmcIds}`,
      {
        headers: {
          Accept: "application/json",
          ["X-CMC_PRO_API_KEY"]: cmcApiKey,
        },
      },
    );
    const topTicker = response.data.data;
    fetchError = response.data.status;

    const returnData = {
      tickerCmcResponse: topTicker,
      fetchError: fetchError,
    };
    return returnData;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return { tickerCmcResponse: null, fetchError: fetchError };
  }
};

import axios, { AxiosResponse } from "axios";
import { Entry } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const getEntry = (
  poolId: string,
  optionId: string,
  entrant: string,
): Promise<AxiosResponse<Entry>> =>
  axios.get(
    `${API_BASE_URL}/pools/${poolId}/options/${optionId}/accounts/${entrant}`,
  );

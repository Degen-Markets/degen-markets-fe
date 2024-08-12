import axios, { AxiosResponse } from "axios";
import { SignatureResponse } from "@/app/lib/utils/bets/types";
import { API_BASE_URL } from "@/app/lib/utils/api/index";

export const claimWin = (
  poolId: string,
  optionId: string,
  account: string,
): Promise<AxiosResponse<SignatureResponse>> =>
  axios.post(`${API_BASE_URL}/pools/${poolId}/options/${optionId}`, {
    account,
  });

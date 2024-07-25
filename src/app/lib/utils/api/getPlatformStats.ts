import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/app/lib/utils/api/index";
import { Stats } from "@/app/types/stats";

export const getPlatformStats = (): Promise<AxiosResponse<Stats>> =>
  axios.get(`${API_BASE_URL}/stats`);

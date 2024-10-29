import axios from "axios";
import { FREENAME_API_BASE_URL } from "@/app/config/api";

export const getFreeNameDomainByAddress = async (
  address: string,
): Promise<string | null> => {
  const response = await axios.get(
    `${FREENAME_API_BASE_URL}/resolver/resolve/address/${address}`,
    {},
  );
  return response.data.data.host;
};

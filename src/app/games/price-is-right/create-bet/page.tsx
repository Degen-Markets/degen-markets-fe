import PriceIsRightGame from "./PriceIsRightGame";
import { getTopTickersCmc } from "@/app/lib/utils/api/getTopTickersCmc";

const CreateBetPage = async () => {
  const { tickerCmcResponse } = await getTopTickersCmc();
  return <PriceIsRightGame tickerCmcResponse={tickerCmcResponse} />;
};

export default CreateBetPage;

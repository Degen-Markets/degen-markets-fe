import BetComponent from "./_components/BetComponent";
import getETHPrice from "../lib/utils/api/getETHPrice";
import { getListedTopTokens } from "../lib/utils/api/getBetTokens";
import { getTopTickersCmc } from "../lib/utils/api/getTopTickersCmc";

const CreateBetPage = async () => {
  const { rate, error } = await getETHPrice();
  const { tickerCmcResponse, fetchError } = await getTopTickersCmc();

  return (
    <div className="mx-3">
      <BetComponent ethPrice={rate} tickerCmcResponse={tickerCmcResponse} />
    </div>
  );
};

export default CreateBetPage;

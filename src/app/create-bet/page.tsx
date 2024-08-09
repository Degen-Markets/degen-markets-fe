import BetComponent from "./_components/BetComponent";
import { getTopTickersCmc } from "../lib/utils/api/getTopTickersCmc";
import { getEthPrice } from "../lib/utils/bets/helpers";

const CreateBetPage = async () => {
  const { tickerCmcResponse, fetchError } = await getTopTickersCmc();
  const ethPrice = tickerCmcResponse ? getEthPrice(tickerCmcResponse) : null;
  return (
    <div className="mx-3">
      <BetComponent ethPrice={ethPrice} tickerCmcResponse={tickerCmcResponse} />
    </div>
  );
};

export default CreateBetPage;

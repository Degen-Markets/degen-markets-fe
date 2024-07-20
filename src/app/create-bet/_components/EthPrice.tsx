import BetValue from "@/app/create-bet/_components/BetValue";
import getETHPrice from "@/app/lib/utils/api/getETHPrice";

const EthPrice = async () => {
  const { rate, error } = await getETHPrice();
  console.log({
    listeningTOETH: rate,
  });
  return <BetValue ethPrice={rate} />;
};

export default EthPrice;

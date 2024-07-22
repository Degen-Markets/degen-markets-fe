import EthPrice from "@/app/create-bet/_components/EthPrice";
import CreateBetButton from "@/app/components/CreateBetButton";
import BetComponent from "./_components/BetComponent";
import BetLayout from "@/app/layouts/BetLayout";
import { useBetContext } from "./BetContext";
import getETHPrice from "../lib/utils/api/getETHPrice";

const CreateBetPage = async () => {
  const { rate, error } = await getETHPrice();
  console.log({
    listeningTOETH: rate,
  });
  return (
    <div className="">
      <BetComponent ethPrice={rate} />
    </div>
  );
};

export default CreateBetPage;

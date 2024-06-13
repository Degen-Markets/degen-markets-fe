import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import BinaryBet from "@/app/bets/[id]/_components/InprogressBet/BinaryBet";
import PriceIsRightBet from "@/app/bets/[id]/_components/InprogressBet/PriceIsRightBet";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}

const InProgressBet = ({ bet, address }: Props) => {
  // eslint-disable-next-line no-console
  console.log("bet  :", bet);

  if (bet.type === "closest-guess-wins") {
    return <PriceIsRightBet bet={bet} address={address} />;
  }
  return <BinaryBet bet={bet} address={address} />;
};

export default InProgressBet;

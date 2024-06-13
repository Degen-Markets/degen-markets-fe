import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import BinaryBet from "@/app/bets/[id]/_components/InprogressBet/BinaryBet";
import PriceIsRightBet from "@/app/bets/[id]/_components/InprogressBet/PriceIsRightBet";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}

const InProgressBet = ({ bet, address }: Props) => {
  return (
    <div className="w-full">
      {bet.type === "closest-guess-wins" ? (
        <PriceIsRightBet bet={bet} address={address} />
      ) : (
        <BinaryBet bet={bet} address={address} />
      )}
    </div>
  );
};

export default InProgressBet;

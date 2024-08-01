import { Button } from "@/app/components/Button";
import { ButtonSuccess } from "@/app/components/Button/ButtonSuccess";
import { ButtonDanger } from "@/app/components/Button/ButtonDanger";
import { BetResponse } from "@/app/lib/utils/bets/types";
import useReplicateBet from "@/app/hooks/useReplicateBet";
import { useRouter } from "next/navigation";
import { FC } from "react";

type BetButtonProps = {
  bet: BetResponse;
};

const BetButton: FC<BetButtonProps> = ({ bet }) => {
  const router = useRouter();
  const replicateBet = useReplicateBet(router);

  const handleOnClick = () => {
    const newBet: BetResponse =
      bet.type === "binary" ? { ...bet, isBetOnUp: !bet.isBetOnUp } : bet;

    replicateBet(newBet);
  };

  if (bet.type === "closest-guess-wins") {
    return (
      <Button
        size="small"
        className="uppercase text-xs lg:text-base"
        onClick={handleOnClick}
      >
        PREDICT NOW
      </Button>
    );
  }

  return bet.isBetOnUp ? (
    <ButtonDanger
      size="small"
      className="uppercase text-xs lg:text-base"
      onClick={handleOnClick}
    >
      Bet down
    </ButtonDanger>
  ) : (
    <ButtonSuccess
      size="small"
      className="uppercase text-xs lg:text-base"
      onClick={handleOnClick}
    >
      Bet up
    </ButtonSuccess>
  );
};

export default BetButton;

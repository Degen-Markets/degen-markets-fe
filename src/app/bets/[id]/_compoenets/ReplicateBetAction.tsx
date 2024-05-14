import { BetResponse, Currency } from "@/app/lib/utils/bets/types";
import { ButtonGradient } from "@/app/components/Button";
import { useRouter } from "next/navigation";

interface Props {
  bet: BetResponse;
}

const ReplicateBetAction = ({ bet }: Props) => {
  const router = useRouter();
  const replicateBet = async () => {
    const { ticker, metric, isBetOnUp, value, currency } = bet;
    const duration = Math.round(
      (Number(bet.expirationTimestamp) - Number(bet.creationTimestamp)) /
        (24 * 60 * 60),
    );
    const direction = isBetOnUp ? "up" : "down";
    router.push(
      `/create-bet?ticker=${ticker}&metric=${metric}&direction=${direction}&duration=${duration}&currency=${currency}&value=${value}`,
    );
  };

  return (
    <ButtonGradient size="small" className="w-2/5" onClick={replicateBet}>
      Replicate this bet!
    </ButtonGradient>
  );
};

export default ReplicateBetAction;

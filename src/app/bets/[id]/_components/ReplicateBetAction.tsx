import { BetResponse } from "@/app/lib/utils/bets/types";
import { ButtonGradient } from "@/app/components/Button";
import useReplicateBet from "@/app/hooks/useReplicateBet";
import { useRouter } from "next/navigation";

interface Props {
  bet: BetResponse;
  className?: string;
}

const ReplicateBetAction = ({ bet, className }: Props) => {
  const router = useRouter();
  const replicateBet = useReplicateBet(router);

  const handleReplicateBet = () => {
    replicateBet(bet);
  };

  return (
    <ButtonGradient
      size="small"
      className={`w-auto !px-6 ${className}`}
      onClick={handleReplicateBet}
    >
      Replicate this bet!
    </ButtonGradient>
  );
};

export default ReplicateBetAction;

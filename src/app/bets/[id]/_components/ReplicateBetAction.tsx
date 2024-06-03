import { BetResponse } from "@/app/lib/utils/bets/types";
import { ButtonGradient } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { formatUnits, zeroAddress } from "viem";
import { STABLECOIN_DECIMALS } from "@/app/lib/utils/bets/constants";

interface Props {
  bet: BetResponse;
  className?: string;
}

const ReplicateBetAction = ({ bet, className }: Props) => {
  const router = useRouter();
  const replicateBet = async () => {
    const { ticker, metric, isBetOnUp, value, currency } = bet;
    const durationInSeconds = Math.round(
      ((Number(bet.expirationTimestamp) - Number(bet.creationTimestamp)) /
        (24 * 60 * 60)) *
        86400,
    );
    const direction = isBetOnUp ? "up" : "down";
    const isEth = currency === zeroAddress;

    const formattedValueToDisplay = formatUnits(
      BigInt(value),
      isEth ? 18 : STABLECOIN_DECIMALS,
    );
    router.push(
      `/create-bet?ticker=${ticker}&metric=${metric}&direction=${direction}&duration=${durationInSeconds}&currency=${currency}&value=${formattedValueToDisplay}`,
    );
  };

  return (
    <ButtonGradient
      size="small"
      className={`w-auto !px-6 ${className}`}
      onClick={replicateBet}
    >
      Replicate this bet!
    </ButtonGradient>
  );
};

export default ReplicateBetAction;

import Image from "next/image";
import { useAccount } from "wagmi";

import MetricDisplay from "@/app/components/Metric";
import UserAvatar from "@/app/components/UserAvatar";
import {
  getCurrencySymbolByAddress,
  getLastActivity,
  shortenHash,
} from "@/app/lib/utils/bets/helpers";
import formattedValueToDisplay from "@/app/lib/utils/formattedValueToDisplay";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { Button } from "@/app/components/Button";
import { ButtonSuccess } from "@/app/components/Button/ButtonSuccess";
import { ButtonDanger } from "@/app/components/Button/ButtonDanger";
import useReplicateBet from "@/app/lib/utils/hooks/useReplicateBet";
import { useRouter } from "next/navigation";
import { FC } from "react";

type ActivityRowProps = {
  bet: BetResponse;
};

const ActivityRow: FC<ActivityRowProps> = ({ bet }) => {
  const router = useRouter();
  const { address } = useAccount();
  const replicateBet = useReplicateBet(router);

  const { actor } = getLastActivity(bet);
  const betImageId = bet.type === "binary" ? "bull_or_bear" : "price_is_right";
  const isUserActor = actor.toLowerCase() === address?.toLowerCase();
  const displayActor = isUserActor ? "YOU" : shortenHash(actor, 4);

  const handleReplicateBet = () => {
    const newBet: BetResponse =
      bet.type === "binary" ? { ...bet, isBetOnUp: !bet.isBetOnUp } : bet;
    replicateBet(newBet);
  };

  const renderBetButton = () => {
    if (bet.type === "closest-guess-wins") {
      return (
        <Button
          size="small"
          className="uppercase text-xs lg:text-base"
          onClick={handleReplicateBet}
        >
          PREDICT NOW
        </Button>
      );
    }
    return bet.isBetOnUp ? (
      <ButtonDanger
        size="small"
        className="uppercase text-xs lg:text-base"
        onClick={handleReplicateBet}
      >
        Bet down
      </ButtonDanger>
    ) : (
      <ButtonSuccess
        size="small"
        className="uppercase text-xs lg:text-base"
        onClick={handleReplicateBet}
      >
        Bet up
      </ButtonSuccess>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-4 lg:gap-x-4 items-center lg:items-center bg-blue-light bg-opacity-20 p-3 text-sm tracking-wide leading-none">
      <div className="flex-shrink-0">
        <Image
          className="w-12 h-12 lg:w-16 lg:h-16 border border-white rounded-md object-cover"
          src={`/games/${betImageId}.jpg`}
          alt={bet.metric}
          width={128}
          height={128}
        />
      </div>
      <div className="flex flex-col flex-grow text-center lg:text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold">
            <span className="text-slg:text-lg">{bet.ticker}</span>
            <MetricDisplay
              className="text-white"
              betType={bet.type}
              metric={bet.metric}
              creationTimestamp={bet.creationTimestamp}
              expirationTimestamp={bet.expirationTimestamp}
              isBetOnUp={bet.isBetOnUp}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-1 text-sm leading-none justify-center lg:justify-start">
          <UserAvatar
            className="w-6 h-6 lg:w-7 lg:h-7"
            width={30}
            height={30}
          />
          {displayActor} bet{" "}
          {bet.type === "binary" && (bet.isBetOnUp ? "UP" : "DOWN")} at&nbsp;
          {formattedValueToDisplay(bet.value, bet.currency)}{" "}
          {getCurrencySymbolByAddress(bet.currency)}
        </div>
      </div>
      <div className="lg:hidden flex-shrink-0 flex justify-center mt-2">
        {renderBetButton()}
      </div>
      <div className="hidden lg:flex-shrink-0 lg:flex lg:items-center">
        {renderBetButton()}
      </div>
    </div>
  );
};

export default ActivityRow;

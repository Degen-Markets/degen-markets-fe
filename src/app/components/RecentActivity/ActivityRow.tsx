import React from "react";
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

type ActivityRowProps = {
  bet: BetResponse;
};

const ActivityRow: React.FC<ActivityRowProps> = ({ bet }) => {
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
        <Button size="small" className="uppercase" onClick={handleReplicateBet}>
          PREDICT NOW
        </Button>
      );
    }
    return bet.isBetOnUp ? (
      <ButtonDanger
        size="small"
        className="uppercase"
        onClick={handleReplicateBet}
      >
        Bet down
      </ButtonDanger>
    ) : (
      <ButtonSuccess
        size="small"
        className="uppercase"
        onClick={handleReplicateBet}
      >
        Bet up
      </ButtonSuccess>
    );
  };

  return (
    <div className="flex gap-x-4 items-center bg-blue-light bg-opacity-20 p-3 text-sm tracking-wide leading-none">
      <Image
        className="w-16 h-16 border border-white rounded-md object-cover"
        src={`/games/${betImageId}.jpg`}
        alt={bet.metric}
        width={128}
        height={128}
      />
      <div className="flex flex-col gap-y-1 flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold">
            {bet.ticker}
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
        <div className="flex items-center gap-x-1 text-sm leading-none">
          <UserAvatar width={30} height={30} />
          {displayActor} bet{" "}
          {bet.type === "binary" && (bet.isBetOnUp ? "UP" : "DOWN")} at&nbsp;
          {formattedValueToDisplay(bet.value, bet.currency)}{" "}
          {getCurrencySymbolByAddress(bet.currency)}
        </div>
      </div>
      <div className="flex-shrink-0">{renderBetButton()}</div>
    </div>
  );
};

export default ActivityRow;

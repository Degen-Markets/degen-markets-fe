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
import { FC } from "react";
import BetButton from "@/app/components/RecentActivity/BetButton";

type ActivityRowProps = {
  bet: BetResponse;
};

const ActivityRow: FC<ActivityRowProps> = ({ bet }) => {
  const { address } = useAccount();
  const { actor } = getLastActivity(bet);
  const betImageId = bet.type === "binary" ? "bull_or_bear" : "price_is_right";
  const isUserActor = actor.toLowerCase() === address?.toLowerCase();
  const displayActor = isUserActor ? "YOU" : shortenHash(actor, 4);

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
          {displayActor} bet&nbsp;
          {bet.type === "binary" && (bet.isBetOnUp ? "UP" : "DOWN")} with&nbsp;
          {formattedValueToDisplay(bet.value, bet.currency)}{" "}
          {getCurrencySymbolByAddress(bet.currency)}
        </div>
      </div>
      <div className="lg:hidden flex-shrink-0 flex justify-center mt-2">
        <BetButton bet={bet} />
      </div>
      <div className="hidden lg:flex-shrink-0 lg:flex lg:items-center">
        <BetButton bet={bet} />
      </div>
    </div>
  );
};

export default ActivityRow;

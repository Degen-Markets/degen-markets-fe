import BetCoundown from "@/app/components/BetCoundown";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import MetricAndWager from "@/app/bets/[id]/_components/MetricAndWager";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import { FC } from "react";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import ActivityRow from "@/app/components/RecentActivity/ActivityRow";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}
const BinaryBet: FC<Props> = ({ bet, address }) => {
  const { creator, expirationTimestamp } = bet;
  const isCreatedByCurrentUser =
    creator.toLowerCase() === address?.toLowerCase();
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl border-4 rounded-xl p-10 bg-blue-secondary bg-opacity-80">
        <Heading>
          <Headline>bull or bear</Headline>
          <div className="flex justify-center">
            <BetCoundown
              classNames="bg-prussian-dark  p-2 border-2 rounded-xl"
              expirationTimestampInS={Number(expirationTimestamp)}
              message="Countdown to accept bet:"
              countDownClassName="text-purple-light"
            />
          </div>
          <div className="mt-3 mb-10">
            <ActivityRow bet={bet} />
          </div>
          <SubHeadline
            isTop={true}
            className="flex gap-2 items-center justify-center bg-gradient-to-r from-pink-light to bg-yellow-light border-4 uppercase min-[90%] lg:px-6 w-80"
          >
            <UserAvatar
              width={16}
              height={16}
              address={creator}
              className="w-4 h-4 md:w-6 md:h-6"
            />
            <div className="drop-shadow-text">
              {isCreatedByCurrentUser
                ? "Created by you"
                : `Created by ${getDisplayNameForAddress(creator)}`}
            </div>
          </SubHeadline>
        </Heading>
        <MetricAndWager bet={bet} />
        {!isCreatedByCurrentUser && (
          <div className="flex flex-col gap-3 items-center">
            <div className="text-white font-bold uppercase drop-shadow-text tex-sm">
              Not a chance...
            </div>
            <AcceptBetButton bet={bet} address={address} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BinaryBet;

import BetCoundown from "@/app/components/BetCoundown";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import MetricAndWager from "@/app/bets/[id]/_components/MetricAndWager";
import AcceptBetButton from "@/app/components/AcceptBetButton";
import { FC } from "react";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}
const BinaryBet: FC<Props> = ({ bet, address }) => {
  const { creator, expirationTimestamp } = bet;
  const isCreatedByCurrentUser =
    creator.toLowerCase() === address?.toLowerCase();
  return (
    <>
      <div className="flex justify-center">
        <BetCoundown
          classNames="bg-prussian-dark  p-2 border-4 border-purple-medium mb-8"
          expirationTimestampInS={Number(expirationTimestamp)}
          message="Countdown to accept bet:"
          countDownClassName="text-purple-light"
        />
      </div>
      <Heading>
        <Headline>Bets that</Headline>
        <SubHeadline
          isTop={true}
          className="flex gap-2  items-center justify-center bg-gradient-to-r from-pink-light to bg-yellow-light border-2 text-prussian-dark border-blue-dark min-[90%] lg:px-6"
        >
          <UserAvatar
            width={16}
            height={16}
            address={creator}
            className="w-4 h-4 md:w-6 md:h-6"
          />
          <div>{isCreatedByCurrentUser ? "Created by you" : creator}</div>
        </SubHeadline>
      </Heading>
      <MetricAndWager bet={bet} />
      {!isCreatedByCurrentUser && (
        <div className="flex flex-col gap-3 items-center">
          <>
            <div className="text-blue-dark">Not a chance...</div>
            <AcceptBetButton bet={bet} address={address} />
          </>
        </div>
      )}
    </>
  );
};

export default BinaryBet;

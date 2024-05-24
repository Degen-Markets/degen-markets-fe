import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import Metric from "@/app/bets/[id]/_components/Metric";
import UserAvatar from "@/app/components/UserAvatar";
import AcceptBetButton from "@/app/components/AcceptBetButton";

interface Props {
  bet: BetResponse;
  address: Address | undefined;
}

const InProgressBet = ({ bet, address }: Props) => {
  const { creator } = bet;
  const isCreatedByCurrentUser = creator === address;

  return (
    <div>
      <Heading>
        <Headline>Bets that</Headline>
        <SubHeadline
          isTop={true}
          className="flex gap-2  items-center justify-center bg-gradient-to-r from-pink-light to bg-yellow-light border-2 text-white border-blue-dark w-[92%]"
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
      <Metric bet={bet} />

      {!isCreatedByCurrentUser && (
        <div className="flex flex-col gap-3 items-center pt-10">
          <>
            <div className="text-blue-dark">Not a chance...</div>
            <AcceptBetButton bet={bet} address={address} />
          </>
        </div>
      )}
    </div>
  );
};

export default InProgressBet;

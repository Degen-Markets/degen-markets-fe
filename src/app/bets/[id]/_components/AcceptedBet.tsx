import { BetResponse } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import BetCoundown from "@/app/components/BetCoundown";
import Metric from "@/app/bets/[id]/_components/Metric";
import ReplicateBetAction from "@/app/bets/[id]/_components/ReplicateBetAction";

interface Props {
  bet: BetResponse;
}

const AcceptedBet = ({ bet }: Props) => {
  const { creator, acceptor, expirationTimestamp } = bet;
  return (
    <>
      <Heading>
        <Headline>
          <div className="flex justify-center">
            <div className="flex text-lg md:text-[1.75rem] items-center gap-2 md:gap-x-16">
              <div className="flex flex-col gap-1 items-center">
                <UserAvatar
                  width={100}
                  height={100}
                  address={creator}
                  className="w-10 h-10 md:w-24 md:h-24"
                />
                <span>{getDisplayNameForAddress(creator)}</span>
              </div>
              <div className="text-2xl md:text-[175px]">VS</div>
              {acceptor && (
                <div className="flex flex-col gap-1 items-center">
                  <UserAvatar
                    width={100}
                    height={100}
                    address={acceptor}
                    className="w-10 h-10 md:w-24 md:h-24"
                  />
                  <span>{getDisplayNameForAddress(acceptor)}</span>
                </div>
              )}
            </div>
          </div>
        </Headline>
        <SubHeadline
          isTop={true}
          className="bg-white border-purple-medium text-neutral-950"
        >
          <BetCoundown
            expirationTimestampInS={Number(expirationTimestamp)}
            message="Bet ends in"
          />
        </SubHeadline>
      </Heading>

      <Metric bet={bet} />
      <div className="flex justify-center mt-4 md:mt-12">
        <ReplicateBetAction bet={bet} />
      </div>
    </>
  );
};

export default AcceptedBet;

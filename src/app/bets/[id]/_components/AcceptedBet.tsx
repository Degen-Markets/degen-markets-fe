import { BetResponse } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import BetCoundown from "@/app/components/BetCoundown";
import MetricAndWager from "@/app/bets/[id]/_components/MetricAndWager";
import ReplicateBetAction from "@/app/bets/[id]/_components/ReplicateBetAction";
import { useAccount } from "wagmi";

interface Props {
  bet: BetResponse;
}

const AcceptedBet = ({ bet }: Props) => {
  const { creator, expirationTimestamp } = bet;
  const { address } = useAccount();
  const acceptor = bet.acceptor || address; // use connected wallet if acceptor is null
  return (
    <>
      <Heading>
        <Headline textShadow={false}>
          <div className="flex justify-center ">
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
              <div className="text-2xl md:text-[165px] drop-shadow-none">
                VS
              </div>
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
          className="!bg-green-main text-prussian-dark border-white border-2 lg:px-6"
        >
          <BetCoundown
            expirationTimestampInS={Number(expirationTimestamp)}
            message="Bet ends in"
            countDownClassName="text-white "
          />
        </SubHeadline>
      </Heading>
      <div className="mt-5">
        <MetricAndWager bet={bet} />
      </div>
      <div className="flex justify-center mt-4 md:mt-8">
        <ReplicateBetAction bet={bet} className="py-7 font-bold" />
      </div>
    </>
  );
};

export default AcceptedBet;

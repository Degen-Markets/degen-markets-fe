"use client";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ButtonGradient } from "@/app/components/Button";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { BetResponse } from "@/app/lib/utils/bets/types";
import WonBet from "@/app/bets/[id]/_compoenets/WonBet";
import AcceptedBet from "@/app/bets/[id]/_compoenets/AcceptedBet";
import Metric from "@/app/bets/[id]/_compoenets/Metric";
import BetThat from "@/app/bets/[id]/_compoenets/BetThat";
import { v4 as uuid } from "uuid";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { DEGEN_MARKETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { base } from "wagmi/chains";
import ReplicateBetAction from "@/app/bets/[id]/_compoenets/ReplicateBetAction";

const AcceptBetPage = ({ params: { id } }: { params: { id: string } }) => {
  const [bet, setBet] = useState<BetResponse>();
  const fetchBet = async () => {
    const { data: bet } = await getBetById(id);
    setBet(bet);
  };
  useEffect(() => {
    fetchBet();
  }, []);
  const { address } = useAccount();
  const { creator, acceptor } = bet || {};
  const isCreatedByCurrentUser = creator === address;
  const winner = bet?.winner ?? null;
  const loser =
    winner === creator ? acceptor : winner === acceptor ? creator : null;
  const showWonBet = winner && loser;
  const showAcceptedBet =
    !showWonBet && acceptor && creator && bet?.expirationTimestamp;
  const showBetThat = !showAcceptedBet && isCreatedByCurrentUser;
  // eslint-disable-next-line no-console
  console.log("showBetThat :", showBetThat);

  return (
    <>
      {bet && (
        <div className="w-[80%] md:w-1/2 mx-auto">
          {showWonBet && (
            <>
              <WonBet winner={winner} loser={loser} />
            </>
          )}

          {showAcceptedBet && (
            <>
              <AcceptedBet
                creator={creator}
                acceptor={acceptor}
                expirationTimestamp={Number(bet.expirationTimestamp)}
              />
              <Metric bet={bet} />
            </>
          )}

          {showBetThat && address && <BetThat bet={bet} address={address} />}
          {(showWonBet || showAcceptedBet) && (
            <div className="flex justify-center mt-12">
              <ReplicateBetAction bet={bet} />
              {showWonBet && (
                <ButtonGradient size="small" className="w-2/5">
                  Share
                </ButtonGradient>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AcceptBetPage;

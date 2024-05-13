"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { DEGEN_MARKETS_ABI } from "../../lib/utils/bets/abis";
import {
  BET_ACCEPTANCE_TIME_LIMIT,
  DEGEN_MARKETS_ADDRESS,
  STABLECOIN_DECIMALS,
} from "../../lib/utils/bets/constants";
import BetCoundown from "@/app/components/BetCoundown";
import {
  getCurrencySymbolByAddress,
  getDisplayNameForAddress,
  isBetConcluded,
  isBetOpen,
  isBetRunning,
} from "@/app/lib/utils/bets/helpers";
import { erc20Abi, formatUnits, maxUint256, zeroAddress } from "viem";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import { base } from "wagmi/chains";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import { ButtonGradient, ButtonPrimary } from "@/app/components/Button";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import UserAvatar from "@/app/components/UserAvatar";
import { getBetById } from "@/app/lib/utils/api/getBetById";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import WinnerHeading from "@/app/bets/[id]/_compoenets/WinnerHeading";
import AcceptedHeading from "@/app/bets/[id]/_compoenets/AcceptedHeading";
import Metric from "@/app/bets/[id]/_compoenets/Metric";
import BetHeading from "@/app/bets/[id]/_compoenets/BetHeading";
import CreatedHeading from "@/app/bets/[id]/_compoenets/CreatedHeading";

const AcceptBetPage = ({ params: { id } }: { params: { id: string } }) => {
  const [bet, setBet] = useState<BetResponse>();
  const fetchBet = async () => {
    const { data: bet } = await getBetById(id);
    setBet(bet);
  };
  useEffect(() => {
    fetchBet();
  }, []);

  // eslint-disable-next-line no-console
  console.log("bet :", bet);

  const { address } = useAccount();
  const router = useRouter();
  const { data: approvalHash, writeContract: sendApprovalTx } =
    useWriteContract();
  const { data: betAcceptHash, writeContract: sendAcceptBetTx } =
    useWriteContract();
  const { isSuccess: isBetAcceptedHashSuccess } = useTransactionReceipt({
    hash: betAcceptHash,
    chainId: base.id,
  });
  const { isSuccess: isApprovalSuccess } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });
  const { userAllowances } = useAllowances(
    isApprovalSuccess || isBetAcceptedHashSuccess,
    address || zeroAddress,
  );

  const { data }: { data?: any[] } = useReadContract({
    abi: DEGEN_MARKETS_ABI,
    address: DEGEN_MARKETS_ADDRESS,
    functionName: "betIdToBet",
    args: [id],
  });

  const { currency = zeroAddress, creator, acceptor } = bet || {};
  const isBetAccepted = acceptor !== zeroAddress && creator && acceptor;
  const isEth = currency === zeroAddress;
  const valueInWei = data ? data[9] : "";

  const currencySymbol = getCurrencySymbolByAddress(currency);
  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;
  const { userBalances } = useBalances(false, address);
  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;
  const expirationTimestampInS = data ? Number(data[6]) : 0;
  const creationTimestampInS = data ? Number(data[2]) : 0;

  const isCreatedByCurrentUser = creator === address;

  const winner = bet?.winner ?? null;
  const loser =
    winner === creator ? acceptor : winner === acceptor ? creator : null;

  const showWinnerHeading = winner && loser;
  const showAcceptedHeading =
    !showWinnerHeading && acceptor && creator && bet?.expirationTimestamp;
  const showCreatedHeading =
    !showWinnerHeading && !showAcceptedHeading && isCreatedByCurrentUser;
  const showBetHeading = !showCreatedHeading;

  const acceptBet = () => {
    sendAcceptBetTx({
      abi: DEGEN_MARKETS_ABI,
      address: DEGEN_MARKETS_ADDRESS,
      functionName: "acceptBet",
      args: [id],
      value: isEth ? valueInWei : undefined,
    });
  };

  const approve = () => {
    sendApprovalTx({
      abi: erc20Abi,
      address: currency,
      functionName: "approve",
      args: [DEGEN_MARKETS_ADDRESS, maxUint256],
    });
  };

  const handleAccept = () => {
    if (!isAllowanceEnough) {
      approve();
    } else {
      acceptBet();
    }
  };

  useEffect(() => {
    if (isApprovalSuccess) {
      acceptBet();
    }
  }, [isApprovalSuccess]);

  useEffect(() => {
    if (isBetAcceptedHashSuccess) {
      router.push(`/bets/${id}/success`);
    }
  }, [isBetAcceptedHashSuccess, id, router]);

  const getActionButtonText = (): string => {
    if (!address) {
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return "Approve and bet";
    }
    return "Accept Bet";
  };

  const getHeadline = () => {
    return isBetAccepted ? (
      <div>
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
            <div className="flex flex-col gap-1 items-center">
              <UserAvatar
                width={100}
                height={100}
                address={acceptor}
                className="w-10 h-10 md:w-24 md:h-24"
              />
              <span>{getDisplayNameForAddress(acceptor)}</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      "Bets that"
    );
  };

  const getSubHeadline = () => {
    return (
      <SubHeadline
        isTop={true}
        className="bg-white border-purple-medium text-neutral-950"
      >
        {isBetAccepted ? (
          <BetCoundown
            expirationTimestampInS={
              isBetAccepted
                ? expirationTimestampInS
                : Number(creationTimestampInS) + BET_ACCEPTANCE_TIME_LIMIT
            }
            message={isBetAccepted ? "Bet ends in" : "Countdown to accept bet"}
          />
        ) : isCreatedByCurrentUser ? (
          "Created by you"
        ) : (
          creator
        )}
      </SubHeadline>
    );
  };

  return (
    <>
      {bet && (
        <div className="w-[80%] md:w-1/2 mx-auto">
          {showWinnerHeading && (
            <>
              <WinnerHeading winner={winner} loser={loser} />
            </>
          )}

          {showAcceptedHeading && (
            <>
              <AcceptedHeading
                creator={creator}
                acceptor={acceptor}
                expirationTimestamp={Number(bet.expirationTimestamp)}
              />
              <Metric bet={bet} />
            </>
          )}
          {showBetHeading && <BetHeading />}

          {showCreatedHeading && <CreatedHeading />}
          {(showWinnerHeading || showAcceptedHeading) && (
            <div className="flex justify-center mt-12">
              <ButtonGradient size="small" className="w-2/5">
                Replicate this bet!
              </ButtonGradient>
              {showWinnerHeading && (
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

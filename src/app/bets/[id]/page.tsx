"use client";
import React, { useEffect, useState } from "react";
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
import { CreatedBetObject, Currency } from "@/app/lib/utils/bets/types";
import BetCoundown from "@/app/components/BetCoundown";
import {
  betDurationInDays,
  getCurrencySymbolByAddress,
} from "@/app/lib/utils/bets/helpers";
import {
  erc20Abi,
  formatUnits,
  maxUint256,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import { base } from "wagmi/chains";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import { ButtonPrimary } from "@/app/components/Button";
import useBalances from "@/app/lib/utils/hooks/useBalances";

const AcceptBetPage = ({ params: { id } }: { params: { id: string } }) => {
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
  const acceptor = data ? data[7] : zeroAddress;
  const isBetAccepted = acceptor !== zeroAddress;
  const currency = data ? data[10] : zeroAddress;
  const creator = data ? data[1] : zeroAddress;
  const isEth = currency === zeroAddress;
  const valueInWei = data ? data[9] : "";
  const valueToDisplay = formatUnits(
    valueInWei,
    isEth ? 18 : STABLECOIN_DECIMALS,
  );
  const currencySymbol = getCurrencySymbolByAddress(currency);
  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;
  const { userBalances } = useBalances(false, address);
  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;
  const expirationTimestampInS = data ? Number(data[6]) : 0;
  const creationTimestampInS = data ? Number(data[2]) : 0;
  const ticker = data ? data[3] : "";
  const metric = data ? data[4] : "";
  const direction = data ? (data[5] === true ? "up" : "down") : "";
  const isExpired = expirationTimestampInS * 1000 - Date.now() < 0;

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

  return (
    <>
      {data && (
        <div className="w-1/2 mx-auto">
          <div className="bg-blue-dark border-purple-medium border-2 text-center w-3/5 mx-auto sm:text-3xl py-2">
            <BetCoundown
              expirationTimestampInS={
                isBetAccepted
                  ? expirationTimestampInS
                  : Number(creationTimestampInS) + BET_ACCEPTANCE_TIME_LIMIT
              }
              message={
                isBetAccepted ? "Bet ends in" : "Countdown to accept bet"
              }
            />
          </div>
          <div className="pt-16 pb-10">
            <Heading>
              <Headline>Bets that</Headline>
              <SubHeadline
                isTop={true}
                className="bg-pink-light border-2 text-neutral-950 border-yellow-light"
              >
                {creator === address ? "Created by you" : creator}
              </SubHeadline>
            </Heading>
          </div>
          <div className="flex justify-center gap-x-4">
            <div className="bg-white border-purple-medium border-4 text-neutral-800 px-4">
              {ticker}&nbsp;-&nbsp;{metric} will&nbsp; go&nbsp;
              {direction}&nbsp;in&nbsp;
              {Math.round(
                (Number(expirationTimestampInS) -
                  Number(creationTimestampInS)) /
                  (24 * 60 * 60),
              )}
              &nbsp;day(s)
            </div>
            <div className="bg-white border-purple-medium border-4 text-neutral-800 px-4">
              Wagered:&nbsp;{valueToDisplay}&nbsp;
              {getCurrencySymbolByAddress(currency)}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center pt-10">
            {!isBetAccepted && !isExpired && (
              <>
                <div className="text-blue-dark">Not a chance...</div>
                <ButtonPrimary size={"regular"} onClick={handleAccept}>
                  {getActionButtonText()}
                </ButtonPrimary>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptBetPage;

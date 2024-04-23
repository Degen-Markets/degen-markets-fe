"use client";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { DEGEN_MARKETS_ABI } from "../../lib/utils/bets/abis";
import {
  DEFAULT_BET_DURATION,
  DEGEN_MARKETS_ADDRESS,
  STABLECOIN_DECIMALS,
} from "../../lib/utils/bets/constants";
import { CreatedBetObject, Currency } from "@/app/lib/utils/bets/types";
import { type UseReadContractReturnType } from "wagmi";
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
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { base } from "wagmi/chains";
import PixelatedHeadingContainer from "@/app/components/PixelatedHeadingContainer";
import { useRouter } from "next/navigation";

const AcceptBetPage = ({ params }: { params: { id: string } }) => {
  const [betToAccept, setBetToAccept] = useState<
    CreatedBetObject | undefined
  >();
  const betId = params.id;

  const router = useRouter();

  const { address } = useAccount();

  const { userAllowances } = useAllowances(
    // isApprovalSuccess || isCreateBetTxSuccess,
    false,
    address || zeroAddress,
  );
  const { userBalances } = useBalances(false, address);

  const [isEth, setIsEth] = useState<boolean>(false);
  const [value, setValue] = useState("10");
  const [settleCurrency, setSettleCurrency] = useState<Currency>(Currency.ETH);
  const valueInWei = isEth ? parseEther(value) : parseUnits(value, 6);
  const isAllowanceEnough =
    userAllowances[settleCurrency as Currency] >= valueInWei;
  // const isBalanceEnough =
  //   userBalances[currency.label as Currency] >= valueInWei;

  const { writeContract: sendApprovalTx, data: approvalHash } =
    useWriteContract();
  const { writeContract: sendAcceptBetTx, data: betAcceptHash } =
    useWriteContract();

  const { isSuccess: isBetAcceptedHashSuccess } = useTransactionReceipt({
    hash: betAcceptHash,
    chainId: base.id,
  });
  const { isSuccess: isApprovalSuccess } = useTransactionReceipt({
    hash: approvalHash,
    chainId: base.id,
  });

  const result = useReadContract({
    abi: DEGEN_MARKETS_ABI,
    address: DEGEN_MARKETS_ADDRESS,
    functionName: "betIdToBet",
    args: [betId],
  });
  const isBetAccepted = result.data
    ? (result.data as any[])[7] !== zeroAddress
    : false;
  const duration = result.data ? parseInt((result.data as any[])[6]) * 1000 : 0;

  useEffect(() => {
    if (Array.isArray(result.data) && result.data.length >= 11) {
      setIsEth(result.data[10] === zeroAddress);
      setValue(
        formatUnits(
          result.data[9],
          result.data[10] === zeroAddress ? 18 : STABLECOIN_DECIMALS,
        ),
      );
      const settleCcyTicker = getCurrencySymbolByAddress(result.data[10]);
      setSettleCurrency(settleCcyTicker ?? Currency.ETH);
      const localBet: CreatedBetObject = {
        id: result.data[0],
        creator: result.data[1],
        creationTimestamp: result.data[2].toString(),
        ticker: result.data[3],
        metric: result.data[4].replaceAll("_", " "),
        isBetOnUp: result.data[5],
        duration: result.data[6].toString(),
        value: formatUnits(
          result.data[9],
          result.data[10] === zeroAddress ? 18 : STABLECOIN_DECIMALS,
        ),
        currency: result.data[10],
      };

      setBetToAccept(localBet);
    } else {
      console.error(
        "Data is not available or not in expected format:",
        result.data,
      );
    }
  }, [result.data]);

  const acceptBet = () => {
    if (betToAccept) {
      console.log("bet value is ", betToAccept.value);
      sendAcceptBetTx({
        abi: DEGEN_MARKETS_ABI,
        address: DEGEN_MARKETS_ADDRESS,
        functionName: "acceptBet",
        args: [betToAccept.id],
        value: isEth ? parseEther(betToAccept.value) : undefined,
      });
    }
  };
  const approve = () => {
    sendApprovalTx({
      abi: erc20Abi,
      address: betToAccept ? betToAccept.currency : zeroAddress,
      functionName: "approve",
      args: [DEGEN_MARKETS_ADDRESS, maxUint256],
    });
  };

  const handleAccept = () => {
    if (!isAllowanceEnough) {
      approve();
      return;
    }
    acceptBet();
  };

  useEffect(() => {
    if (isApprovalSuccess) {
      acceptBet();
    }
  }, [isApprovalSuccess]);

  useEffect(() => {
    if (isBetAcceptedHashSuccess) {
      router.push(`/bets/${betId}/success`);
    }
  }, [isBetAcceptedHashSuccess]);

  return (
    <>
      {result && betToAccept && (
        <div className="w-1/2 mx-auto">
          <div className="bg-blue-dark border-pink-light border-2 text-center w-3/5 mx-auto text-3xl py-2">
            <BetCoundown
              betCreationTimestamp={betToAccept.creationTimestamp}
              duration={isBetAccepted ? duration : DEFAULT_BET_DURATION}
              message={
                isBetAccepted ? "Bet ends in" : "Countdown to accept bet"
              }
            />
          </div>
          <div className="flex flex-col pt-16 pb-10">
            <div className="relative z-20">
              <div className="bg-pink-light border-2 text-neutral-950 border-yellow-light absolute -top-5 py-2 px-4 text-center left-[50%] -translate-x-[50%] z-20">
                {betToAccept.creator === address
                  ? "Created by you"
                  : betToAccept.creator}
              </div>
            </div>
            <PixelatedHeadingContainer>bets that:</PixelatedHeadingContainer>
          </div>
          <div className="flex justify-center gap-x-4">
            <div className="bg-white border-pink-light border-4 text-neutral-800 px-4">
              {betToAccept.ticker}&nbsp;-&nbsp;{betToAccept.metric} will&nbsp;
              go&nbsp;{betToAccept.isBetOnUp ? "up" : "down"}&nbsp;in&nbsp;
              {betDurationInDays(betToAccept.duration)}
            </div>
            <div className="bg-white border-pink-light border-4 text-neutral-800 px-4">
              Wagered:&nbsp;{betToAccept.value}&nbsp;
              {getCurrencySymbolByAddress(betToAccept.currency)}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center pt-10">
            {!isBetAccepted && (
              <>
                <div className="text-blue-dark">Not a chance...</div>
                <button
                  className="masked-button p-1 rounded-full text-3xl w-fit cursor-pointer"
                  onClick={handleAccept}
                >
                  <span className="flex flex-row bg-blue-dark rounded-full px-2 py-1">
                    <span className="masked-button-text flex geo-font cursor-pointer">
                      Approve and bet
                      <span className="gradient-button-arrow flex items-center"></span>
                    </span>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptBetPage;

import { useTransactionReceipt, useWriteContract } from "wagmi";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { erc20Abi, maxUint256, zeroAddress } from "viem";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import Metric from "@/app/bets/[id]/_components/Metric";
import { ButtonGradient } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { DEGEN_MARKETS_ABI } from "@/app/lib/utils/bets/abis";
import { DEGEN_MARKETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import { useEffect } from "react";
import { base } from "wagmi/chains";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import UserAvatar from "@/app/components/UserAvatar";

interface Props {
  bet: BetResponse;
  address: Address;
}

const InProgressBet = ({ bet, address }: Props) => {
  const { id, creator, value, currency } = bet;
  const isEth = currency === zeroAddress;
  const valueInWei = BigInt(value);

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
  const currencySymbol = getCurrencySymbolByAddress(currency);
  const { userBalances } = useBalances(false, address);

  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;
  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;
  const isCreatedByCurrentUser = creator === address;

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
    <div>
      <Heading className="w-72">
        <Headline>Bets that</Headline>
        <SubHeadline
          isTop={true}
          className="flex gap-2  items-center justify-center bg-gradient-to-r from-pink-light to bg-yellow-light border-2 text-white border-blue-dark w-[92%] md:w-[74%]"
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
            <ButtonGradient size={"regular"} onClick={handleAccept}>
              {getActionButtonText()}
            </ButtonGradient>
          </>
        </div>
      )}
    </div>
  );
};

export default InProgressBet;

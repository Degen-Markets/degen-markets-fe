import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { erc20Abi, maxUint256, zeroAddress } from "viem";
import DEGEN_BETS_ABI from "@/app/lib/utils/bets/DegenBetsAbi.json";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { getCurrencySymbolByAddress } from "@/app/lib/utils/bets/helpers";
import { ButtonGradient } from "@/app/components/Button";
import { base } from "wagmi/chains";
import { Address, BetResponse, Tx } from "@/app/lib/utils/bets/types";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { config } from "../providers";
import { useToast } from "./Toast/ToastProvider";

interface AcceptBetButtonProps {
  bet: BetResponse;
  address: Address | undefined;
}

const AcceptBetButton = ({ bet, address }: AcceptBetButtonProps) => {
  const [approvalHash, setApprovalHash] = useState<string | null>(null);
  const [acceptBetHash, setAcceptBetHash] = useState<string | null>(null);
  const [txState, setTxState] = useState<Tx>(Tx.Idle);
  const { showToast } = useToast();
  const { id, value, currency } = bet;
  const isEth = currency === zeroAddress;
  const valueInWei = BigInt(value);

  const isStateIdle = txState === Tx.Idle;

  const router = useRouter();

  const { userAllowances } = useAllowances(
    !!approvalHash || !!acceptBetHash,
    address || zeroAddress,
  );
  const currencySymbol = getCurrencySymbolByAddress(currency);
  const { userBalances } = useBalances(false, address);

  const isAllowanceEnough = userAllowances[currencySymbol] >= valueInWei;
  const isBalanceEnough = userBalances[currencySymbol] >= valueInWei;

  const acceptBet = async () => {
    try {
      setTxState(Tx.Pending);
      const hash = await writeContract(config, {
        abi: DEGEN_BETS_ABI,
        address: DEGEN_BETS_ADDRESS,
        functionName: "acceptBet",
        args: [id, ""],
        value: isEth ? valueInWei : undefined,
        chainId: base.id,
      });
      setTxState(Tx.Processing);
      await waitForTransactionReceipt(config, { hash });
      setAcceptBetHash(hash);
    } catch (error: any) {
      console.error("Error acceptBet", error);
      setTxState(Tx.Idle);
      showToast(error.shortMessage ?? error, "error");
    } finally {
      setTxState(Tx.Idle);
    }
  };

  const approve = async () => {
    try {
      setTxState(Tx.Pending);
      const hash = await writeContract(config, {
        abi: erc20Abi,
        address: currency,
        functionName: "approve",
        args: [DEGEN_BETS_ADDRESS, maxUint256],
      });
      setTxState(Tx.Processing);
      await waitForTransactionReceipt(config, { hash });
      setApprovalHash(hash);
    } catch (error) {
      console.error("Error during approval:", error);
      setTxState(Tx.Idle);
    } finally {
      setTxState(Tx.Idle);
    }
  };

  const handleAccept = () => {
    if (!isAllowanceEnough) {
      approve();
    } else {
      acceptBet();
    }
  };

  useEffect(() => {
    if (acceptBetHash) {
      const checkTransactionReceipt = async () => {
        const receipt = await waitForTransactionReceipt(config, {
          hash: acceptBetHash as Address,
        });
        if (receipt.status === "success") {
          router.push(`/bets/${id}/success`);
        }
      };
      checkTransactionReceipt();
    }
  }, [acceptBetHash, id, router]);

  const getActionButtonText = (): string => {
    if (!address) {
      return "Wallet not connected";
    }
    if (!isBalanceEnough) {
      return "Not enough balance";
    }
    if (!isAllowanceEnough) {
      return `Approve ${currencySymbol}`;
    }
    return "Accept Bet";
  };

  return (
    <ButtonGradient
      loader={true}
      disabled={!isStateIdle}
      txState={txState}
      size={"regular"}
      onClick={handleAccept}
    >
      {getActionButtonText()}
    </ButtonGradient>
  );
};

export default AcceptBetButton;

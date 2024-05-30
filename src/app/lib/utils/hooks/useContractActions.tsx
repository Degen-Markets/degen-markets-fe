import { useEffect, useState } from "react";
import { erc20Abi, maxUint256, zeroAddress } from "viem";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import useAllowances from "@/app/lib/utils/hooks/useAllowances";
import useBalances from "@/app/lib/utils/hooks/useBalances";
import { Tx, Currency, Address } from "@/app/lib/utils/bets/types";
import { config } from "@/app/providers";
import { DEGEN_BETS_ADDRESS } from "@/app/lib/utils/bets/constants";

interface UseContractInteraction {
  currency: Address;
  address: Address | undefined;
}
interface ContractActionConfig {
  abi: any; // Contract ABI
  address: Address; // Contract Address
  functionName: string; // Function name to be called
  args?: any[]; // Optional function arguments
  betId?: string; // Optional bet ID (if applicable)
  // You can add other configuration options as needed
}

interface UseContractInteractionResult {
  txState: Tx;
  approvalHash: string | null;
  transactionHash: string | null;
  betId: string | null;
  approve: () => Promise<void>;
  userAllowances: Record<string, bigint>;
  userBalances: Record<string, bigint>;
}

const useContractInteraction = ({
  currency,
  address,
}: UseContractInteraction): UseContractInteractionResult => {
  const router = useRouter();
  const [approvalHash, setApprovalHash] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [txState, setTxState] = useState<Tx>(Tx.Idle);
  const [betId, setBetId] = useState<string | null>(null);

  const { userAllowances, refreshAllowances } = useAllowances(
    !!approvalHash || !!transactionHash,
    address || zeroAddress,
  );

  const { userBalances } = useBalances(!!transactionHash, address);

  const approve = async (): Promise<void> => {
    try {
      setTxState(Tx.Pending);
      const hash = await writeContract(config, {
        abi: erc20Abi,
        address: currency,
        functionName: "approve",
        args: [DEGEN_BETS_ADDRESS, maxUint256],
      });
      setApprovalHash(hash);
      setTxState(Tx.Processing);
      await waitForTransactionReceipt(config, { hash });
      await refreshAllowances();
    } catch (error) {
      console.error("Error during approval:", error);
      setTxState(Tx.Idle);
    } finally {
      setTxState(Tx.Idle);
    }
  };

  const writeContractAction = async (
    contractConfig: ContractActionConfig,
  ): Promise<string | null> => {
    try {
      setTxState(Tx.Pending);
      const hash = await writeContract(config, contractConfig);
      setTransactionHash(hash);
      if (contractConfig.betId) {
        setBetId(contractConfig.betId);
      }
      setTxState(Tx.Processing);
      await waitForTransactionReceipt(config, { hash: hash as Address });
      return hash;
    } catch (error) {
      console.error("Error during transaction:", error);
      setTxState(Tx.Idle);
      return null;
    } finally {
      setTxState(Tx.Idle);
    }
  };

  useEffect(() => {
    if (transactionHash) {
      // Handle transaction receipt logic here (e.g., refresh data, navigate)
    }
  }, [transactionHash, router]);

  return {
    txState,
    approvalHash,
    transactionHash,
    betId,
    approve,
    writeContractAction,
    userAllowances,
    userBalances,
  };
};

export default useContractInteraction;

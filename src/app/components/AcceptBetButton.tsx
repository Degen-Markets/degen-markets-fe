import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import useBetActions from "@/app/hooks/useBetActions";
import { ButtonSuccess } from "@/app/components/Button/ButtonSuccess";
import { twMerge } from "tailwind-merge";

interface AcceptBetButtonProps {
  bet: BetResponse;
  address: Address | undefined;
  className?: string;
  strikePriceAcceptor?: string;
  error?: string;
}

const AcceptBetButton: FC<AcceptBetButtonProps> = ({
  bet,
  address,
  className,
  strikePriceAcceptor = "",
  error,
}) => {
  const router = useRouter();
  const { id, currency, value } = bet;

  const {
    isBalanceEnough,
    isPending,
    isProcessing,
    approve,
    acceptBet,
    isBetAcceptedSuccess,
    isAllowanceEnough,
    currencySymbol,
  } = useBetActions({
    betId: id,
    currency,
    value: BigInt(value),
    strikePriceAcceptor,
  });

  const handleAccept = () => {
    if (!isAllowanceEnough) {
      approve();
    } else {
      acceptBet();
    }
  };
  useEffect(() => {
    if (isBetAcceptedSuccess) {
      router.push(`/bets/${id}/success`);
    }
  }, [isBetAcceptedSuccess, id, router]);

  const buttonText =
    error ||
    (!address
      ? "Wallet not connected"
      : !isBalanceEnough
        ? "Not enough balance"
        : !isAllowanceEnough
          ? `Approve ${currencySymbol}`
          : "Approve and Bet");

  return (
    <ButtonSuccess
      loader={true}
      disabled={!!error || isPending || isProcessing}
      isPending={isPending}
      isProcessing={isProcessing}
      size={"regular"}
      onClick={handleAccept}
      className={twMerge(className)}
    >
      {buttonText}
    </ButtonSuccess>
  );
};

export default AcceptBetButton;

import { FC, useCallback, useEffect, memo } from "react";
import { Button } from "@/app/components/Button";
import { BetResponse } from "@/app/lib/utils/bets/types";
import useBetActions from "@/app/hooks/useBetActions";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";
import useReplicateBet from "@/app/hooks/useReplicateBet";
import { twMerge } from "tailwind-merge";
import { isBetExpired } from "@/app/lib/utils/bets/helpers";

const betUpButtonCls =
  "bg-green-light text-black-medium hover:bg-green-main active:bg-green-main";
const betDownButtonCls =
  "bg-red-light text-black-medium hover:bg-red-main active:bg-red-main";

type BetButtonProps = {
  bet: BetResponse;
};

const BetButton: FC<BetButtonProps> = ({ bet }) => {
  const router = useRouter();
  const { address } = useAccount();
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);
  const replicateBet = useReplicateBet(router);
  const { id, currency, value, type, isBetOnUp, creator } = bet;
  const createdByCurrentUser = creator.toLowerCase() === address?.toLowerCase();

  const {
    isBalanceEnough,
    isPending,
    isProcessing,
    approve,
    acceptBet,
    isBetAcceptedSuccess,
    isAllowanceEnough,
  } = useBetActions({ betId: id, currency, value: BigInt(value) });

  const shouldReplicateBet =
    !isBalanceEnough ||
    bet.acceptor ||
    isBetExpired(bet) ||
    createdByCurrentUser;

  const handleOnClick = useCallback(async () => {
    if (!address) {
      setOpenConnector(true);
      return;
    }

    if (shouldReplicateBet) {
      replicateBet({
        ...bet,
        isBetOnUp: type === "binary" ? !isBetOnUp : isBetOnUp,
      });
      return;
    }

    if (type === "binary") {
      if (!isAllowanceEnough) {
        approve();
      } else {
        acceptBet();
      }
    } else {
      router.push(`/bets/${id}?betType=${type}`);
    }
  }, [
    address,
    isBalanceEnough,
    approve,
    acceptBet,
    type,
    router,
    id,
    isAllowanceEnough,
  ]);

  useEffect(() => {
    if (isBetAcceptedSuccess) {
      router.push(`/bets/${id}/success`);
    }
  }, [isBetAcceptedSuccess, id, router]);

  return (
    <Button
      size="small"
      className={twMerge(
        "uppercase text-xs lg:text-base",
        bet.type === "binary" && !shouldReplicateBet
          ? isBetOnUp
            ? betDownButtonCls
            : betUpButtonCls
          : "",
      )}
      onClick={handleOnClick}
      disabled={isPending || isProcessing}
    >
      {type === "binary" && !createdByCurrentUser
        ? isBetOnUp
          ? "Bet down"
          : "Bet up"
        : "Replicate"}
    </Button>
  );
};

export default memo(BetButton);

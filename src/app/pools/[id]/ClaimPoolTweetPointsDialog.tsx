import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/Dialog/dialog";
import { tryItAsync } from "@/app/lib/utils/tryIt";
import { useToast } from "@/app/components/Toast/ToastProvider";
import Input from "@/app/components/Input";
import { Button } from "@/app/components/Button/Button";
import { claimPoolTweetPoints } from "@/app/lib/utils/api/twitter";
import { Player } from "@/app/types/player";

const ClaimPoolTweetPointsDialog = ({
  poolId,
  userAddress,
  isOpen,
  onClose: handleClose,
}: {
  poolId: string;
  userAddress: Player["address"];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { showToast } = useToast();
  const [tweetUrl, setTweetUrl] = useState("");
  const [isVerifyingClaim, setIsVerifyingClaim] = useState(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) handleClose();
    },
    [handleClose],
  );

  const verifyClaim = useCallback(async () => {
    setIsVerifyingClaim(true);
    const claimTrial = await tryItAsync(() =>
      claimPoolTweetPoints({ tweetUrl, poolId, playerAddress: userAddress }),
    );
    setIsVerifyingClaim(false);

    if (!claimTrial.success) {
      showToast("Failed to claim points. Please try again.", "error");
      console.error(claimTrial.err);
      return;
    }

    const { pointsAwarded } = claimTrial.data;
    showToast(
      `Successfully claimed points. You have been awarded ${pointsAwarded} points!`,
      "success",
    );
    handleClose();
  }, [tweetUrl, poolId, showToast, handleClose, userAddress]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTweetUrl(e.target.value);
    },
    [],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim Points</DialogTitle>
        </DialogHeader>
        <Input
          value={tweetUrl}
          disabled={isVerifyingClaim}
          onChange={handleInputChange}
          placeholder="Enter the link to your tweet sharing this page"
        />
        <Button
          loader
          isProcessing={isVerifyingClaim}
          onClick={verifyClaim}
          intent="primary"
        >
          Claim
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimPoolTweetPointsDialog;

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
import { claimPoolTweetPoints } from "@/app/api/twitter";
import { Player } from "@/app/types/player";

const ClaimPoolTweetPointsDialog = ({
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
    const claimTrial = await tryItAsync<
      Awaited<ReturnType<typeof claimPoolTweetPoints>>,
      Error
    >(() => claimPoolTweetPoints({ tweetUrl }));

    if (!claimTrial.success) {
      const errMsg = claimTrial.err.message;
      showToast(errMsg, "error");
      console.error(claimTrial.err);
      setIsVerifyingClaim(false);
      return;
    }

    const { pointsAwarded, authorUsername } = claimTrial.data;
    const displayedUsername = authorUsername
      ? `@${authorUsername}`
      : "the author of that tweet";
    showToast(
      `Awarded ${pointsAwarded} points to ${displayedUsername}!`,
      "success",
    );
    setTimeout(() => {
      setIsVerifyingClaim(false);
      handleClose();
    }, 2000);
  }, [tweetUrl, showToast, handleClose]);

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
          loading={isVerifyingClaim}
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

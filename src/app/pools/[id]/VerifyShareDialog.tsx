import { useCallback, useState } from "react";
import axios from "axios";
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
import { Player } from "@/app/types/player";

const VerifyShareDialog = ({
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
  const [tweetLink, setTweetLink] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) handleClose();
    },
    [handleClose],
  );

  const handleVerify = useCallback(async () => {
    setIsVerifying(true);
    const verifyRequestTrial = await tryItAsync(() =>
      axios.post<{ isSuccess: boolean }>(`${API_BASE_URL}/api/verify-x-share`, {
        tweetLink,
        poolId,
      }),
    );
    setIsVerifying(false);

    if (
      !verifyRequestTrial.success ||
      !verifyRequestTrial.data.data.isSuccess
    ) {
      showToast("Failed to verify tweet. Please try again.", "error");
      console.error(
        verifyRequestTrial.success
          ? verifyRequestTrial.data
          : verifyRequestTrial.err,
      );
      return;
    }

    showToast(
      "Successfully verified tweet. You have been awarded 10 points!",
      "success",
    );
    handleClose();
  }, [tweetUrl, poolId, showToast, handleClose, userAddress]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTweetLink(e.target.value);
    },
    [],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Your Tweet</DialogTitle>
        </DialogHeader>
        <Input
          value={tweetLink}
          disabled={isVerifying}
          onChange={handleInputChange}
          placeholder="Enter the link to your tweet"
        />
        <Button
          loader
          isProcessing={isVerifying}
          onClick={handleVerify}
          intent="primary"
        >
          Verify
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyShareDialog;

"use client";
import { useState, useCallback } from "react";
import { Button } from "@/app/components/Button/Button";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import ClaimPoolTweetPointsDialog from "./ClaimPoolTweetPointsDialog";
import { Pool } from "@/app/lib/utils/types";
import useShareOnTwitterFlow from "@/app/hooks/useShareOnTwitterFlow";

const ShareOnTwitterBanner = ({ poolId }: { poolId: Pool["address"] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const { handleShare } = useShareOnTwitterFlow({ poolId, openDialog });
  const { userProfile } = useUserProfileContext();

  return (
    <div className="flex flex-row gap-4 items-center justify-between p-4">
      <div className="mb-4 sm:mb-0">
        Share this on X to get 10 airdrop points
      </div>
      <Button intent="primary" onClick={handleShare}>
        Share
      </Button>
      {isDialogOpen && !!userProfile?.address && (
        <ClaimPoolTweetPointsDialog
          poolId={poolId}
          isOpen={isDialogOpen}
          userAddress={userProfile.address}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

export default ShareOnTwitterBanner;

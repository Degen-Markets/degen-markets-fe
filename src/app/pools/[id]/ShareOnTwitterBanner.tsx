"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/Button/Button";
import {
  UserProfileProvider,
  useUserProfileContext,
} from "@/app/context/UserProfileContext";
import { useSearchParams } from "next/navigation";
import ClaimPoolTweetPointsDialog from "./ClaimPoolTweetPointsDialog";
import ConnectTwitterDialog from "./ConnectTwitterDialog";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnectProfileThen } from "@/app/hooks/enhancedWallet";
import { Pool } from "@/app/lib/utils/types";
import useShareOnTwitterFlow from "./utils/useShareOnTwitterFlow";
import { useDialogControls } from "@/app/components/Dialog/dialog";

export const RESUME_SHARE_FLOW_SEARCH_PARAM = {
  key: "resume-share",
  values: {
    true: "true",
  },
};

const ShareOnTwitterBanner = ({ poolId }: { poolId: Pool["address"] }) => {
  return (
    <UserProfileProvider>
      <Content poolId={poolId} />
    </UserProfileProvider>
  );
};

const Content = ({ poolId }: { poolId: Pool["address"] }) => {
  const claimDialogControls = useDialogControls();
  const connectTwitterDialogControls = useDialogControls();

  const { handleShare } = useShareOnTwitterFlow({
    poolId,
    openClaimDialog: claimDialogControls.open,
    openConnectTwitterDialog: connectTwitterDialogControls.open,
  });
  const { userProfile } = useUserProfileContext();

  return (
    <div className="flex flex-col gap-4 sm:flex-row items-center justify-between p-4">
      <div className="mb-4 sm:mb-0">
        Share this on X to get 10 airdrop points
      </div>
      <Button intent="primary" onClick={handleShare}>
        Share
      </Button>
      {claimDialogControls.isOpen && !!userProfile.address && (
        <ClaimPoolTweetPointsDialog
          isOpen={claimDialogControls.isOpen}
          onClose={claimDialogControls.close}
        />
      )}
      <ConnectTwitterDialog
        isOpen={connectTwitterDialogControls.isOpen}
        onClose={connectTwitterDialogControls.close}
      />
    </div>
  );
};

export default ShareOnTwitterBanner;

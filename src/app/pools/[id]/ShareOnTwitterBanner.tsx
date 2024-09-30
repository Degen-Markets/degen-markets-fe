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

const useDialog = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, open, close };
};

const Content = ({ poolId }: { poolId: Pool["address"] }) => {
  const claimDialog = useDialog();
  const connectTwitterDialog = useDialog();

  const { handleShare } = useShareOnTwitterFlow({
    poolId,
    openClaimDialog: claimDialog.open,
    openConnectTwitterDialog: connectTwitterDialog.open,
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
      {claimDialog.isOpen && !!userProfile.address && (
        <ClaimPoolTweetPointsDialog
          isOpen={claimDialog.isOpen}
          onClose={claimDialog.close}
        />
      )}
      <ConnectTwitterDialog
        isOpen={connectTwitterDialog.isOpen}
        onClose={connectTwitterDialog.close}
      />
    </div>
  );
};

const useShareOnTwitterFlow = ({
  poolId,
  openClaimDialog,
  openConnectTwitterDialog,
}: {
  poolId: Pool["address"];
  openClaimDialog: () => void;
  openConnectTwitterDialog: () => void;
}) => {
  const { connected } = useWallet();
  const connectProfileThen = useConnectProfileThen();
  const searchParams = useSearchParams();
  const { userProfile, isProfileLoading } = useUserProfileContext();

  const startShareFlow = useCallback(() => {
    const tweetText = encodeURIComponent(
      `Place your bets on @DEGEN_MARKETS\ndegenmarkets.com/pools/${poolId}`,
    );
    window.open(`https://x.com/compose/post?text=${tweetText}`, "_blank");
    openClaimDialog();
  }, [poolId, openClaimDialog]);

  const isReadyToShare =
    connected && !isProfileLoading && !!userProfile?.twitterUsername;

  const handleShare = useCallback(() => {
    if (!connected) {
      connectProfileThen(async (userProfile) => {
        if (!!userProfile?.twitterUsername) {
          startShareFlow();
        } else {
          openConnectTwitterDialog();
        }
      });
      return;
    }
    if (!isReadyToShare) {
      openConnectTwitterDialog();
      return;
    }
    startShareFlow();
  }, [
    openConnectTwitterDialog,
    isReadyToShare,
    connectProfileThen,
    connected,
    startShareFlow,
  ]);

  const isResumingShareViaSearchParam =
    searchParams.get(RESUME_SHARE_FLOW_SEARCH_PARAM.key) ===
    RESUME_SHARE_FLOW_SEARCH_PARAM.values.true;
  const isReadyToResumeShare = isResumingShareViaSearchParam && isReadyToShare;
  useEffect(() => {
    if (!isReadyToResumeShare) {
      return;
    }

    startShareFlow();
  }, [isReadyToResumeShare, startShareFlow]);

  return { handleShare };
};

export default ShareOnTwitterBanner;

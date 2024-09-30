import { useCallback, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnectProfileThen } from "@/app/hooks/enhancedWallet";
import { useSearchParams } from "next/navigation";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { Pool } from "@/app/lib/utils/types";
import { RESUME_SHARE_FLOW_SEARCH_PARAM } from "../ShareOnTwitterBanner";

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

export default useShareOnTwitterFlow;

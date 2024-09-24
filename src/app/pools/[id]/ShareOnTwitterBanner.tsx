"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/Button/Button";
import {
  UserProfileProvider,
  useUserProfileContext,
} from "@/app/context/UserProfileContext";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClaimPoolTweetPointsDialog from "./ClaimPoolTweetPointsDialog";
import { useWallet } from "@solana/wallet-adapter-react";

const RESUME_SHARE_FLOW_SEARCH_PARAM = {
  key: "resume-share",
  values: {
    true: "true",
  },
};

const ShareOnTwitterBanner = ({ poolId }: { poolId: string }) => {
  return (
    <UserProfileProvider>
      <Content poolId={poolId} />
    </UserProfileProvider>
  );
};

const Content = ({ poolId }: { poolId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userProfile, isProfileLoading } = useUserProfileContext();
  const { showToast, hideToast } = useToast();
  const router = useRouter();
  const currPath = usePathname();
  const searchParams = useSearchParams();
  const { connected } = useWallet();

  const redirectToConnectTwitter = useCallback(() => {
    const getRedirectPath = () => {
      const modifiedSearchParams = new URLSearchParams(searchParams);
      modifiedSearchParams.set(
        RESUME_SHARE_FLOW_SEARCH_PARAM.key,
        RESUME_SHARE_FLOW_SEARCH_PARAM.values.true,
      );
      // user is redirected to this path after they connect their twitter account, and the
      // share flow is resumed
      const pathToReturnAfterRedirect = `${currPath}?${modifiedSearchParams.toString()}`;
      return `/my-profile?redirect=${encodeURIComponent(pathToReturnAfterRedirect)}`;
    };

    let secondsLeft = 5;
    const intervalId = setInterval(() => {
      showToast(
        `You must connect your X account first. Redirecting in ${secondsLeft} seconds...`,
        "info",
      );
      if (secondsLeft === 0) {
        clearInterval(intervalId);
        hideToast();
        const redirectPath = getRedirectPath();
        router.replace(redirectPath);
      }
      secondsLeft--;
    }, 1000);
  }, [router, showToast, hideToast, currPath, searchParams]);

  const handleShare = useCallback(() => {
    if (!isProfileLoading && !userProfile?.twitterUsername) {
      redirectToConnectTwitter();
      return;
    }

    const tweetText = encodeURIComponent(
      `Place your bets on @DEGEN_MARKETS\ndegenmarkets.com/pools/${poolId}`,
    );
    window.open(`https://x.com/compose/post?text=${tweetText}`, "_blank");
    setIsDialogOpen(true);
  }, [
    redirectToConnectTwitter,
    userProfile?.twitterUsername,
    poolId,
    isProfileLoading,
  ]);

  // let the user pick up after redirect auth flow
  const isResumingShareViaSearchParam =
    searchParams.get(RESUME_SHARE_FLOW_SEARCH_PARAM.key) ===
    RESUME_SHARE_FLOW_SEARCH_PARAM.values.true;
  const isReadyToShare =
    isResumingShareViaSearchParam &&
    connected &&
    !isProfileLoading &&
    !!userProfile?.twitterUsername;
  useEffect(() => {
    if (!isReadyToShare) {
      return;
    }

    handleShare();
  }, [isReadyToShare, handleShare]);
  return (
    <div className="flex flex-col gap-4 sm:flex-row items-center justify-between p-4">
      <div className="mb-4 sm:mb-0">
        Share this on X to get 10 airdrop points
      </div>
      <Button intent="primary" onClick={handleShare}>
        Share
      </Button>
      {isDialogOpen && !!userProfile.address && (
        <ClaimPoolTweetPointsDialog
          poolId={poolId}
          isOpen={isDialogOpen}
          userAddress={userProfile.address}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ShareOnTwitterBanner;

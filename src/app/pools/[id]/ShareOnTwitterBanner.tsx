"use client";
import { useCallback, useState } from "react";
import { Button } from "@/app/components/Button/Button";
import {
  UserProfileProvider,
  useUserProfileContext,
} from "@/app/context/UserProfileContext";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClaimPoolTweetPointsDialog from "./ClaimPoolTweetPointsDialog";

const DIALOG_SEARCH_PARAM = {
  key: "open-claim-dialog",
  values: {
    open: "true",
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
  const searchParams = useSearchParams();
  const isDialogOpenByDefault =
    searchParams.get(DIALOG_SEARCH_PARAM.key) ===
    DIALOG_SEARCH_PARAM.values.open;
  const [isDialogOpen, setIsDialogOpen] = useState(isDialogOpenByDefault);
  const { userProfile } = useUserProfileContext();
  const { showToast, hideToast } = useToast();
  const router = useRouter();
  const currPath = usePathname();

  const redirectWithToast = useCallback(() => {
    const getRedirectPath = () => {
      const modifiedSearchParams = new URLSearchParams(searchParams);
      modifiedSearchParams.set(
        DIALOG_SEARCH_PARAM.key,
        DIALOG_SEARCH_PARAM.values.open,
      );
      // user is redirected to this path after they connect their X account, and the
      // claim dialog is automatically opened
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
    if (!userProfile?.twitterUsername) {
      redirectWithToast();
      return;
    }

    const tweetText = encodeURIComponent(
      `Place your bets on @DEGEN_MARKETS\ndegenmarkets.com/pools/${poolId}`,
    );
    window.open(`https://x.com/compose/post?text=${tweetText}`, "_blank");
    setIsDialogOpen(true);
  }, [redirectWithToast, userProfile?.twitterUsername, poolId]);

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

"use client";
import { useCallback, useState } from "react";
import { Button } from "@/app/components/Button/Button";
import {
  UserProfileProvider,
  useUserProfileContext,
} from "@/app/context/UserProfileContext";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { usePathname, useRouter } from "next/navigation";
import ClaimPoolTweetPointsDialog from "./ClaimPoolTweetPointsDialog";

const ShareOnTwitterBanner = ({ poolId }: { poolId: string }) => {
  return (
    <UserProfileProvider>
      <Content poolId={poolId} />
    </UserProfileProvider>
  );
};

const Content = ({ poolId }: { poolId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userProfile } = useUserProfileContext();
  const { showToast, hideToast } = useToast();
  const router = useRouter();
  const currPath = usePathname();

  const redirectWithToast = useCallback(() => {
    let secondsLeft = 5;
    const intervalId = setInterval(() => {
      showToast(
        `You must connect your X account first. Redirecting in ${secondsLeft} seconds...`,
        "info",
      );
      if (secondsLeft === 0) {
        clearInterval(intervalId);
        hideToast();
        router.replace(`/my-profile?redirect=${encodeURIComponent(currPath)}`);
      }
      secondsLeft--;
    }, 1000);
  }, [router, showToast, hideToast, currPath]);

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

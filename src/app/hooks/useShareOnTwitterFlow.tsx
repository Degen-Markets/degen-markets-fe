import { useWallet } from "@solana/wallet-adapter-react";
import { useConnectProfileThen } from "./enhancedWallet";
import { useToast } from "../components/Toast/ToastProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY,
  useUserProfileContext,
} from "../context/UserProfileContext";
import { Pool } from "../lib/utils/types";
import { useCallback, useEffect } from "react";

const RESUME_SHARE_FLOW_SEARCH_PARAM = {
  key: "resume-share",
  values: {
    true: "true",
  },
};

const useShareOnTwitterFlow = ({
  poolId,
  openDialog,
}: {
  poolId: Pool["address"];
  openDialog: () => void;
}) => {
  const { connected } = useWallet();
  const connectProfileThen = useConnectProfileThen();
  const { showToast, hideToast } = useToast();
  const router = useRouter();
  const currPath = usePathname();
  const searchParams = useSearchParams();
  const { userProfile, isProfileLoading } = useUserProfileContext();

  const getRedirectPath = (
    searchParams: ReturnType<typeof useSearchParams>,
    currPath: string,
  ) => {
    const modifiedSearchParams = new URLSearchParams(searchParams);
    modifiedSearchParams.set(
      RESUME_SHARE_FLOW_SEARCH_PARAM.key,
      RESUME_SHARE_FLOW_SEARCH_PARAM.values.true,
    );
    // user is redirected to this path after they connect their twitter account, and the
    // share flow is resumed
    const pathToReturnAfterRedirect = `${currPath}?${modifiedSearchParams.toString()}`;
    return `/my-profile?${REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY}=${encodeURIComponent(pathToReturnAfterRedirect)}`;
  };

  const redirectToConnectTwitter = useCallback(() => {
    let secondsLeft = 5;
    const intervalId = setInterval(() => {
      showToast(
        `You must connect your X account first. Redirecting in ${secondsLeft} seconds...`,
        "info",
      );
      if (secondsLeft === 0) {
        clearInterval(intervalId);
        hideToast();
        const redirectPath = getRedirectPath(searchParams, currPath);
        router.push(redirectPath);
      }
      secondsLeft--;
    }, 1000);
  }, [router, showToast, hideToast, currPath, searchParams]);

  const startShareFlow = useCallback(() => {
    const tweetText = encodeURIComponent(
      `Place your bets on @DEGEN_MARKETS\ndegenmarkets.com/pools/${poolId}`,
    );
    // window.open won't run unless it's called in response to a user action (browser blocks popups)
    // in most of our flows, user has already clicked somewhere on screen, so this will work
    window.open(`https://x.com/compose/post?text=${tweetText}`, "_blank");
    openDialog();
  }, [poolId, openDialog]);

  const isReadyToShare =
    connected && !isProfileLoading && !!userProfile?.twitterUsername;

  const handleShare = useCallback(() => {
    if (!connected) {
      connectProfileThen(async (userProfile) => {
        if (!!userProfile?.twitterUsername) {
          startShareFlow();
        } else {
          redirectToConnectTwitter();
        }
      });
      return;
    }
    if (!isReadyToShare) {
      redirectToConnectTwitter();
      return;
    }
    startShareFlow();
  }, [
    redirectToConnectTwitter,
    isReadyToShare,
    connectProfileThen,
    connected,
    startShareFlow,
  ]);

  // let the user pick up after redirect auth flow
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

import { useDialog } from "@/app/components/Dialog/dialog";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { DialogType } from "@/app/types/dialog";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import {
  getTwitterLoginLink,
  saveTwitterProfile,
} from "@/app/lib/utils/api/twitter";

const useTwitterAuthFlow = () => {
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toBase58();

  const searchParams = useSearchParams();
  const twitterCode = searchParams.get("code");

  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();

  const { setOpen: setSignatureModal } = useDialog(DialogType.signature);
  const { setUserProfile } = useUserProfileContext();

  const isSignatureRequired = !!(
    twitterCode &&
    wallet.connected &&
    wallet.publicKey
  );

  const handleError = useCallback(
    (error: any, defaultMessage: string, additionalMessage?: string) => {
      const errorMessage = error?.response?.data?.message ?? defaultMessage;
      const finalMessage = additionalMessage
        ? `${errorMessage}${additionalMessage}`
        : errorMessage;
      showToast(finalMessage, "error");
      console.error(error);
    },
    [showToast],
  );

  const connectTwitter = useCallback(async () => {
    if (!wallet.connected) {
      showToast("Please connect your wallet first.", "info");
      return;
    }
    if (!twitterCode) {
      try {
        const { data } = await getTwitterLoginLink();
        router.push(data.url);
      } catch (error) {
        handleError(error, "Failed to get Twitter login link.");
      }
    } else {
      setSignatureModal(true);
    }
  }, [
    wallet.connected,
    twitterCode,
    showToast,
    setSignatureModal,
    router,
    handleError,
  ]);

  const saveUser = useCallback(
    async (signature: string) => {
      if (!wallet.connected || !publicKey) {
        showToast("Please connect your wallet.", "info");
        return;
      }
      try {
        if (twitterCode && signature && publicKey) {
          const { data: twitterUser } = await saveTwitterProfile(
            twitterCode,
            signature,
            publicKey,
          );
          setUserProfile(twitterUser);
          router.replace(pathname);
        }
      } catch (error) {
        handleError(error, "Failed to save Twitter user.");
        router.replace(pathname);
      }
    },
    [
      wallet.connected,
      publicKey,
      twitterCode,
      showToast,
      router,
      pathname,
      setUserProfile,
      handleError,
    ],
  );

  return { connectTwitter, isSignatureRequired, saveUser };
};

export default useTwitterAuthFlow;

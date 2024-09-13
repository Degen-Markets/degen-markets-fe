"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getPlayerById,
  getTwitterLoginLink,
  saveTwitterProfile,
} from "@/app/lib/utils/api/twitter";
import { useCallback, useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Button } from "@/app/components/Button/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/app/components/Toast/ToastProvider";
import SignatureDialog from "@/app/components/Dialog/signMessageDialog";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";

const defaultText = "Connect X";

const TwitterButton = ({
  setTwitterPfpUrl,
}: {
  setTwitterPfpUrl: (url: string) => void;
}) => {
  const [text, setText] = useState(defaultText);
  const { open, setOpen } = useDialog(DialogType.signature);
  const [loading, setLoading] = useState<boolean>(false);

  const twitterUserFound = text !== defaultText;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const wallet = useWallet();
  const { showToast } = useToast();
  const twitterCode = searchParams.get("code");
  const publicKey = wallet.publicKey?.toBase58();

  const isSignatureRequired =
    twitterCode && wallet.connected && wallet.publicKey;

  const checkPlayerExists = useCallback(async (address: string) => {
    try {
      const { data } = await getPlayerById(address);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error checking player:", error);
      return false;
    }
  }, []);

  const handleLogin = async () => {
    if (!wallet?.connected) {
      showToast("Please connect your wallet first.", "info");
      return;
    }

    if (!publicKey) return;

    setLoading(true);
    setText("Loading...");
    // Check if the player already exists
    const playerData = await checkPlayerExists(publicKey);
    setLoading(false);
    if (playerData) {
      setText(`@${playerData.twitterUsername}`);
      setTwitterPfpUrl(playerData.twitterPfpUrl);
      return; // Skip saving the user
    }

    if (!twitterCode) {
      try {
        const { data } = await getTwitterLoginLink();
        router.push(data.url);
      } catch (error) {
        console.error("Error getting Twitter login link:", error);
        showToast("Failed to get Twitter login link.", "error");
      }
    } else {
      setOpen(true);
    }
  };

  const saveUser = async (signature: string) => {
    if (!wallet.connected || !publicKey) {
      showToast("Please connect your wallet.", "info");
      return;
    }

    try {
      if (twitterCode && signature && publicKey) {
        const twitterUserResponse = await saveTwitterProfile(
          twitterCode,
          signature,
          publicKey,
        );

        const twitterUser = twitterUserResponse.data;
        setText(`@${twitterUser.twitterUsername}`);
        setTwitterPfpUrl(twitterUser.twitterPfpUrl);
        router.replace(pathname);
      }
    } catch (error) {
      console.error("Error saving Twitter user:", error);
      showToast("Failed to save Twitter user.", "error");
      router.replace(pathname); // Remove the code from the URL
    }
  };

  useEffect(() => {
    if (isSignatureRequired) {
      setOpen(true);
    }
  }, [twitterCode, wallet.connected, publicKey]);

  return (
    <>
      <Button size={"small"} onClick={handleLogin} disabled={twitterUserFound}>
        {twitterCode ? "Sign Msg" : text}
      </Button>
      {twitterUserFound && (
        <BsPatchCheckFill className="absolute -top-3 -right-3" size={25} />
      )}

      {isSignatureRequired && (
        <SignatureDialog open={open} setOpen={setOpen} saveUser={saveUser} />
      )}
    </>
  );
};

export default TwitterButton;

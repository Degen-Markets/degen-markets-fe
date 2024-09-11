"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getTwitterLoginLink,
  saveTwitterProfile,
} from "@/app/lib/utils/api/twitter";
import { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Button } from "@/app/components/Button/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/app/components/Toast/ToastProvider";
import SignatureDialog from "@/app/components/Dialog/signMessageDialog";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";

const defaultText = "Connect X";

const TwitterButton = () => {
  const [text, setText] = useState(defaultText);
  const { open, setOpen } = useDialog(DialogType.signature);

  const twitterUserFound = text !== defaultText;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const wallet = useWallet();
  const { showToast } = useToast();
  const twitterCode = searchParams.get("code");

  const signMessageModal = twitterCode && wallet.connected && wallet.publicKey;

  const handleLogin = async () => {
    if (!wallet?.connected) {
      showToast("Please connect your wallet.", "info");
      return;
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
    if (!wallet.connected || !wallet.publicKey) {
      showToast("Please connect your wallet.", "info");
      return;
    }

    try {
      if (twitterCode && signature && wallet.publicKey) {
        const twitterUserResponse = await saveTwitterProfile(
          twitterCode,
          signature,
          wallet.publicKey.toBase58(),
        );

        const twitterUser = twitterUserResponse.data;

        setText(`@${twitterUser.twitterUsername}`);
        router.replace(pathname);
      }
    } catch (error) {
      console.error("Error saving Twitter user:", error);
      showToast("Failed to save Twitter user.", "error");
      router.replace(pathname); // Remove the code from the URL
    }
  };

  useEffect(() => {
    if (signMessageModal) {
      setOpen(true);
    }
  }, [twitterCode, wallet.connected, wallet.publicKey]);

  return (
    <>
      <Button size={"small"} onClick={handleLogin} disabled={twitterUserFound}>
        {twitterCode ? "Sign Msg" : text}
      </Button>
      {twitterUserFound && (
        <BsPatchCheckFill className="absolute -top-3 -right-3" size={25} />
      )}

      {signMessageModal && (
        <SignatureDialog open={open} setOpen={setOpen} saveUser={saveUser} />
      )}
    </>
  );
};

export default TwitterButton;

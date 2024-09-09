"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getTwitterLoginLink,
  saveTwitterUser,
} from "@/app/lib/utils/api/twitter";
import React, { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Button } from "@/app/components/Button/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { signMessage, verifySignedMessage } from "@/app/context/WalletContext"; // Import your signMessage function
import SignatureDialog from "@/app/components/Dialog/signMessageDialog";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";

const defaultText = "Connect X";

const TwitterButton = () => {
  const [text, setText] = useState(defaultText);
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = useDialog(DialogType.signature);

  const twitterUserFound = text !== defaultText;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const wallet = useWallet();
  const { showToast } = useToast();
  const twitterCode = searchParams.get("code");

  const showModal = twitterCode && wallet.connected && wallet.publicKey;

  const handleLogin = async () => {
    if (!twitterCode) {
      const linkResponse = await getTwitterLoginLink();
      router.push(linkResponse.data.url);
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
      setLoading(true);
      if (twitterCode && signature) {
        // // Save Twitter user with the signature
        // const twitterUserResponse = await saveTwitterUser(
        //   twitterCode,
        //   signature,
        //   wallet.publicKey.toString(),
        // );
        // const twitterUser = twitterUserResponse.data;
        // setText(`@${twitterUser.username}`);

        router.replace(pathname); // Remove the code from the URL
      }
    } catch (error) {
      console.error("Error saving Twitter user:", error);
      showToast("Failed to save Twitter user.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) {
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

      {showModal && (
        <SignatureDialog open={open} setOpen={setOpen} saveUser={saveUser} />
      )}
    </>
  );
};

export default TwitterButton;

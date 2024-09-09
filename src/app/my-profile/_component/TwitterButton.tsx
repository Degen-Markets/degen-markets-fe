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

const defaultText = "Connect X";

const TwitterButton = () => {
  const [text, setText] = useState(defaultText);
  const [loading, setLoading] = useState(false);
  const twitterUserFound = text !== defaultText;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const wallet = useWallet();
  const { showToast } = useToast();

  const handleLogin = async () => {
    const linkResponse = await getTwitterLoginLink();
    router.push(linkResponse.data.url);
  };

  const saveUser = async () => {
    const twitterCode = searchParams.get("code");

    // Ensure wallet is connected and twitterCode exists
    if (!twitterCode || !wallet.connected) {
      showToast(
        "Please connect your wallet and authorize via Twitter.",
        "info",
      );
      return;
    }

    try {
      setLoading(true);
      // Sign the message using the wallet
      const signedData = await signMessage(wallet);
      if (!signedData) {
        showToast("Message signing failed.", "error");
        setLoading(false);
        return;
      }

      const { message, signature } = signedData;
      const verified = await verifySignedMessage(wallet, message, signature);

      console.log({
        verified,
      });

      if (verified && twitterCode) {
        // Save the Twitter user with the signature
        const twitterUserResponse = await saveTwitterUser(
          twitterCode,
          signature.toString(),
        );

        const twitterUser = twitterUserResponse.data;

        setText(`@${twitterUser.username}`);
        router.replace(pathname); // To remove the code from the URL after the user has logged in
      }
    } catch (error) {
      console.error("Error during Twitter login and message signing:", error);
      showToast("Error signing message or saving Twitter user.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    saveUser();
  }, [searchParams]);

  return (
    <>
      <Button size={"small"} onClick={handleLogin} disabled={twitterUserFound}>
        {text}
      </Button>
      {twitterUserFound && (
        <BsPatchCheckFill className="absolute -top-3 -right-3" size={25} />
      )}
    </>
  );
};

export default TwitterButton;

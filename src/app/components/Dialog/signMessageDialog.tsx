"use client";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "./dialog";
import GradientText from "../GradientText";
import { signMessage, verifySignedMessage } from "@/app/context/WalletContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "../Toast/ToastProvider";
import { saveTwitterUser } from "@/app/lib/utils/api/twitter";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../Button/Button";

interface SignatureDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  saveUser: (signature: string) => Promise<void>;
}

const SignatureDialog = ({ open, setOpen, saveUser }: SignatureDialogProps) => {
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();
  const { showToast } = useToast();

  const sendSignMessageAndTwitterCode = async () => {
    try {
      setLoading(true);
      if (!wallet.connected || !wallet.signMessage) {
        showToast(
          "Please connect your wallet and authorize via Twitter.",
          "info",
        );
        return;
      }

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

      if (verified) {
        await saveUser(signature.toString());
        setOpen(false);
      } else {
        showToast("Message verification failed.", "error");
      }
    } catch (error) {
      console.error("Error during Twitter login and message signing:", error);
      showToast("Error signing message or saving Twitter user.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-4xl">
            <GradientText className="text-left">
              Sign with your Wallet
            </GradientText>
          </DialogTitle>
          <DialogDescription className="!text-2xl text-left">
            Sign message to access your profile.{" "}
          </DialogDescription>
        </DialogHeader>
        <Button
          intent={"primary"}
          loader
          disabled={loading}
          isPending={loading}
          pendingText="Signing message..."
          onClick={sendSignMessageAndTwitterCode}
        >
          Sign Message
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureDialog;

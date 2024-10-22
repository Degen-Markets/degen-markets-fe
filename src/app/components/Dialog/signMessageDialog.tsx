"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import GradientText from "../GradientText";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "../Toast/ToastProvider";
import { Button } from "../Button/Button";
import bs58 from "bs58";
import { signMessage } from "@/app/lib/utils/cryptography";

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
          "Wallet is not connected or doesn't support message signing",
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
      const signatureBase58 = bs58.encode(signature);
      await saveUser(signatureBase58);
      setOpen(false);
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
          disabled={loading}
          loading={loading}
          loadingText="Signing message..."
          onClick={sendSignMessageAndTwitterCode}
        >
          Sign Message
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureDialog;

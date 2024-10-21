"use client";
import { useEffect } from "react";
import { Button } from "@/app/components/Button/Button";
import SignatureDialog from "@/app/components/Dialog/signMessageDialog";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { twMerge } from "tailwind-merge";
import useTwitterAuthFlow from "./useTwitterAuthFlow";
import XIcon from "@/app/components/Icons/XIcon";

const TwitterButton = () => {
  const { open, setOpen } = useDialog(DialogType.signature);
  const { userProfile, isProfileLoading } = useUserProfileContext();
  const { connectTwitter, saveUser, isSignatureRequired } =
    useTwitterAuthFlow();

  const buttonText = isProfileLoading
    ? "Connecting..."
    : userProfile?.twitterUsername
      ? "Connected"
      : "Connect Twitter";

  const twitterUserFound = !!userProfile?.twitterUsername;
  const isDisabled = twitterUserFound || isProfileLoading;

  useEffect(() => {
    if (isSignatureRequired) {
      setOpen(true);
    }
  }, [isSignatureRequired]);

  if (userProfile?.twitterUsername) {
    return null;
  }

  return (
    <>
      <Button
        className={twMerge(isDisabled && "cursor-not-allowed")}
        size={"small"}
        intent="secondary"
        onClick={connectTwitter}
        disabled={isDisabled}
        icon={<XIcon width={24} height={24} />}
      >
        {isSignatureRequired ? "Sign Msg" : buttonText}
      </Button>
      {isSignatureRequired && (
        <SignatureDialog open={open} setOpen={setOpen} saveUser={saveUser} />
      )}
    </>
  );
};

export default TwitterButton;

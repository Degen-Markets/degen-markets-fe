"use client";
import { useEffect } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Button } from "@/app/components/Button/Button";
import SignatureDialog from "@/app/components/Dialog/signMessageDialog";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { FaSquareXTwitter } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const TwitterButton = () => {
  const { open, setOpen } = useDialog(DialogType.signature);
  const {
    userProfile,
    connectTwitter,
    isSignatureRequired,
    saveUser,
    isProfileLoading,
  } = useUserProfileContext();

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

  return (
    <>
      <Button
        className={twMerge(
          "bg-black-light  border flex items-center justify-center cursor-pointer !px-2",
          isDisabled && "cursor-not-allowed",
        )}
        size={"small"}
        onClick={connectTwitter}
        disabled={isDisabled}
      >
        <FaSquareXTwitter size={25} className="mr-2" />
        <p>{isSignatureRequired ? "Sign Msg" : buttonText}</p>
      </Button>

      {isSignatureRequired && (
        <SignatureDialog open={open} setOpen={setOpen} saveUser={saveUser} />
      )}
    </>
  );
};

export default TwitterButton;

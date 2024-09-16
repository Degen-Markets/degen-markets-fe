"use client";
import { useEffect } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Button } from "@/app/components/Button/Button";
import SignatureDialog from "@/app/components/Dialog/signMessageDialog";
import { DialogType, useDialog } from "@/app/components/Dialog/dialog";
import { useUserProfileContext } from "@/app/context/UserProfileContext";

const TwitterButton = () => {
  const { open, setOpen } = useDialog(DialogType.signature);
  const {
    userProfile,
    connectTwitter,
    isSignatureRequired,
    saveUser,
    setUserProfile,
    isProfileLoading,
  } = useUserProfileContext();

  const buttonText = isProfileLoading
    ? "Connecting..."
    : userProfile?.twitterUsername
      ? `@${userProfile.twitterUsername}`
      : "Connect X";

  const isProfileEmpty = !userProfile?.address && !userProfile?.twitterUsername;

  useEffect(() => {
    if (isSignatureRequired) {
      setOpen(true);
    }
  }, [isSignatureRequired]);

  return (
    <>
      <Button
        size={"small"}
        onClick={connectTwitter}
        disabled={!isProfileEmpty || isProfileLoading}
      >
        {isSignatureRequired ? "Sign Msg" : buttonText}
      </Button>
      {userProfile?.twitterUsername && (
        <BsPatchCheckFill className="absolute -top-3 -right-3" size={25} />
      )}

      {isSignatureRequired && (
        <SignatureDialog open={open} setOpen={setOpen} saveUser={saveUser} />
      )}
    </>
  );
};

export default TwitterButton;

import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/Dialog/dialog";
import { Button } from "@/app/components/Button/Button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY } from "@/app/context/UserProfileContext";
import { RESUME_SHARE_FLOW_SEARCH_PARAM } from "./ShareOnTwitterBanner";

interface ConnectTwitterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectTwitterDialog = ({
  isOpen,
  onClose,
}: ConnectTwitterDialogProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currPath = usePathname();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) onClose();
    },
    [onClose],
  );

  const getRedirectPath = useCallback(() => {
    const modifiedSearchParams = new URLSearchParams(searchParams);
    modifiedSearchParams.set(
      RESUME_SHARE_FLOW_SEARCH_PARAM.key,
      RESUME_SHARE_FLOW_SEARCH_PARAM.values.true,
    );
    const pathToReturnAfterRedirect = `${currPath}?${modifiedSearchParams.toString()}`;
    return `/my-profile?${REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY}=${encodeURIComponent(pathToReturnAfterRedirect)}`;
  }, [searchParams, currPath]);

  const handleRedirect = useCallback(() => {
    onClose();
    const redirectPath = getRedirectPath();
    router.push(redirectPath);
  }, [onClose, getRedirectPath, router]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Your X Account</DialogTitle>
        </DialogHeader>
        <p className="mb-4">
          You need to connect your X (formerly Twitter) account first. The
          points will be airdropped to the author of the X post (tweet).
        </p>
        <Button intent="primary" onClick={handleRedirect}>
          Take me there
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectTwitterDialog;

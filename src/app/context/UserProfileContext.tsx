import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useToast } from "@/app/components/Toast/ToastProvider";
import { getPlayerById } from "../lib/utils/api/players";
import {
  getTwitterLoginLink,
  saveTwitterProfile,
} from "../lib/utils/api/twitter";
import { DialogType, useDialog } from "../components/Dialog/dialog";
import { Player } from "../types/player";
import { Address } from "../lib/utils/bets/types";

interface UserContextType {
  userProfile: Player;
  connectTwitter: () => void;
  isProfileLoading: boolean;
  saveUser: (signature: string) => Promise<void>;
  isSignatureRequired: boolean;
  setUserProfile: React.Dispatch<React.SetStateAction<Player>>;
}

const UserProfileContext = createContext<UserContextType | undefined>(
  undefined,
);

const initialUserProfile = {
  address: "" as Address,
  points: 0,
  twitterUsername: "",
  twitterPfpUrl: "",
};

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wallet = useWallet();
  const [userProfile, setUserProfile] = useState<Player>(initialUserProfile);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const { open, setOpen: setSignatureModal } = useDialog(DialogType.signature);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const twitterCode = searchParams.get("code");
  const publicKey = wallet.publicKey?.toBase58();
  const isSignatureRequired = !!(
    twitterCode &&
    wallet.connected &&
    wallet.publicKey
  );

  const handleError = (
    error: any,
    defaultMessage: string,
    additionalMessage?: string,
  ) => {
    const errorMessage = error?.response?.data?.message ?? defaultMessage;
    const finalMessage = additionalMessage
      ? `${errorMessage}${additionalMessage}`
      : errorMessage;
    showToast(finalMessage, "error");
    console.error(error);
  };

  const fetchUserProfile = async (address: string) => {
    setIsProfileLoading(true);
    try {
      const { data } = await getPlayerById(address);
      setUserProfile(data || null);
    } catch (error) {
      handleError(
        error,
        "Failed to fetch user profile.",
        "! Please Connect to X",
      );
    } finally {
      setIsProfileLoading(false);
    }
  };

  const connectTwitter = useCallback(async () => {
    if (!wallet.connected) {
      showToast("Please connect your wallet first.", "info");
      return;
    }
    if (!twitterCode) {
      try {
        const { data } = await getTwitterLoginLink();
        router.push(data.url);
      } catch (error) {
        handleError(error, "Failed to get Twitter login link.");
      }
    } else {
      setSignatureModal(true);
    }
  }, [wallet.connected, twitterCode, showToast, setSignatureModal, router]);

  const saveUser = useCallback(
    async (signature: string) => {
      if (!wallet.connected || !publicKey) {
        showToast("Please connect your wallet.", "info");
        return;
      }
      try {
        if (twitterCode && signature && publicKey) {
          const { data: twitterUser } = await saveTwitterProfile(
            twitterCode,
            signature,
            publicKey,
          );
          setUserProfile(twitterUser);
          router.replace(pathname);
        }
      } catch (error) {
        handleError(error, "Failed to save Twitter user.");
        router.replace(pathname);
      }
    },
    [wallet.connected, publicKey, twitterCode, showToast, router, pathname],
  );

  useEffect(() => {
    if (wallet.connected && publicKey && !isSignatureRequired) {
      fetchUserProfile(publicKey);
    } else if (!wallet.connected) {
      setUserProfile(initialUserProfile); // Reset profile on wallet disconnection
    }
  }, [wallet.connected, publicKey]);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        connectTwitter,
        saveUser,
        isProfileLoading,
        isSignatureRequired,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(
      "useUserProfileContext must be used within a UserProfileProvider",
    );
  }
  return context;
};

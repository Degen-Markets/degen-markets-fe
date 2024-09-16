import React, { createContext, useContext, useState, useEffect } from "react";
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

interface UserContextType {
  userProfile: Player | null;
  connectTwitter: () => void;
  isProfileLoading: boolean;
  saveUser: (signature: string) => Promise<void>;
  isSignatureRequired: boolean;
  setUserProfile: React.Dispatch<React.SetStateAction<Player | null>>;
}

const UserProfileContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet();
  const [userProfile, setUserProfile] = useState<Player | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const { open, setOpen: setSignatureModal } = useDialog(DialogType.signature);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const twitterCode = searchParams.get("code");
  const publicKey = wallet.publicKey?.toBase58();

  const isSignatureRequired = (twitterCode &&
    wallet.connected &&
    wallet.publicKey) as boolean;

  const fetchUserProfile = async (address: string) => {
    setIsProfileLoading(true);
    try {
      const { data } = await getPlayerById(address);
      if (data) {
        setUserProfile(data);
      } else {
        setUserProfile(null);
      }
    } catch (error: any) {
      console.error("Error getting Twitter login link:", error);

      // check if backend has a response with an error message
      if (error.response && error.response.data && error.response.data.error) {
        showToast(
          `Info: ${error.response?.data?.error}!, Please Connect X`,
          "info",
        );
      } else {
        showToast("Failed to Connect Twitter", "error");
      }
    } finally {
      setIsProfileLoading(false);
    }
  };

  const connectTwitter = async () => {
    if (!wallet.connected) {
      showToast("Please connect your wallet first.", "info");
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
      // Trigger signature if Twitter login is complete
      setSignatureModal(true);
    }
  };

  const saveUser = async (signature: string) => {
    if (!wallet.connected || !publicKey) {
      showToast("Please connect your wallet.", "info");
      return;
    }
    try {
      if (twitterCode && signature && publicKey) {
        const twitterUserResponse = await saveTwitterProfile(
          twitterCode,
          signature,
          publicKey,
        );
        const twitterUser = twitterUserResponse.data;
        setUserProfile(twitterUser);
        router.replace(pathname);
      }
    } catch (error) {
      console.error("Error saving Twitter user:", error);
      showToast("Failed to save Twitter user.", "error");
      router.replace(pathname);
    }
  };

  useEffect(() => {
    if (wallet.connected && publicKey) {
      fetchUserProfile(publicKey);
    } else if (!wallet.connected) {
      setUserProfile(null);
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
    throw new Error("useUserProfileContext must be used within a UserProvider");
  }
  return context;
};

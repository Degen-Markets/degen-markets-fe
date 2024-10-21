import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlayerById } from "@/app/api/players";
import { Player } from "../types/player";

// This helps you easily change the param in all the places that use it
export const REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY = "redirect";

type UserProfile = Player | null;

export interface UserContextType {
  userProfile: UserProfile;
  isProfileLoading: boolean;
  isProfileFetchInititated: boolean;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const UserProfileContext = createContext<UserContextType | undefined>(
  undefined,
);

const initialUserProfile: UserProfile = null;

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wallet = useWallet();
  const [userProfile, setUserProfile] =
    useState<UserProfile>(initialUserProfile);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [isProfileFetchInititated, setIsProfileFetchInititated] =
    useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const publicKey = wallet.publicKey?.toBase58();

  const fetchUserProfile = useCallback(
    async (address: string) => {
      setIsProfileFetchInititated(true);
      setIsProfileLoading(true);
      const playerData = await getPlayerById(address);
      if (!playerData) {
        console.error("Failed to fetch user profile");
        return;
      }

      setUserProfile(playerData);
      const redirectPath = searchParams.get(
        REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY,
      );

      if (redirectPath) {
        router.push(redirectPath); // Redirect to given url
      }
      setIsProfileLoading(false);
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (wallet.connected && publicKey) {
      fetchUserProfile(publicKey);
    } else if (!wallet.connected) {
      setUserProfile(initialUserProfile); // Reset profile on wallet disconnection
      setIsProfileFetchInititated(false);
    }
  }, [wallet.connected, publicKey, fetchUserProfile]);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isProfileLoading,
        isProfileFetchInititated,
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

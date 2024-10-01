import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlayerById } from "../lib/utils/api/players";
import { Player } from "../types/player";

// This helps you easily change the param in all the places that use it
export const REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY = "redirect";

interface UserContextType {
  userProfile: Player;
  isProfileLoading: boolean;
  isProfileFetchInititated: boolean;
  setUserProfile: React.Dispatch<React.SetStateAction<Player>>;
}

const UserProfileContext = createContext<UserContextType | undefined>(
  undefined,
);

const initialUserProfile = {
  address: "",
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
  const [isProfileFetchInititated, setIsProfileFetchInititated] =
    useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const publicKey = wallet.publicKey?.toBase58();

  const fetchUserProfile = useCallback(
    async (address: string) => {
      setIsProfileFetchInititated(true);
      setIsProfileLoading(true);
      try {
        const { data } = await getPlayerById(address);
        setUserProfile(data || null);
        const redirectPath = searchParams.get(
          REDIRECT_AFTER_PROFILE_LOAD_SEARCH_PARAM_KEY,
        );

        if (redirectPath) {
          router.push(redirectPath); // Redirect to given url
        }
      } catch (error) {
        console.error(
          error,
          "Failed to fetch user profile! Please Connect to X",
        );
      } finally {
        setIsProfileLoading(false);
      }
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

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useRef } from "react";
import { useUserProfileContext } from "../context/UserProfileContext";
import { Player } from "../types/player";

/**
 * Hook to prompt wallet connection and execute a callback after connection
 */
const useConnectWalletThen = () => {
  const { visible, setVisible } = useWalletModal();
  const { connected, connecting } = useWallet();

  const callbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (visible) {
      return;
    }
    const isUserRejectedConn = !connected && !connecting;
    const isUserConnected = connected && !connecting;
    if (isUserRejectedConn) {
      callbackRef.current = null;
    } else if (isUserConnected && callbackRef.current) {
      callbackRef.current();
      callbackRef.current = null;
    }
  }, [connected, connecting, visible]);

  const promptConnectThen = (cb: () => void | Promise<void>) => {
    callbackRef.current = cb;
    setVisible(true);
  };

  return promptConnectThen;
};

/**
 * Hook to prompt wallet connection, load user profile, and execute a callback
 */
const useConnectProfileThen = () => {
  const { visible, setVisible } = useWalletModal();
  const { connected, connecting } = useWallet();
  const userProfileContext = useUserProfileContext();

  const callbackRef = useRef<((userProfile: Player) => void) | null>(null);

  useEffect(() => {
    if (visible || userProfileContext.isProfileLoading) {
      return;
    }
    const isUserRejectedConn = !connected && !connecting;
    const isUserConnectedAndProfileLoaded =
      connected && !connecting && !userProfileContext.isProfileLoading;
    if (isUserRejectedConn) {
      callbackRef.current = null;
    } else if (isUserConnectedAndProfileLoaded && callbackRef.current) {
      callbackRef.current(userProfileContext.userProfile);
      callbackRef.current = null;
    }
  }, [
    connecting,
    connected,
    userProfileContext.userProfile,
    userProfileContext.isProfileLoading,
    visible,
  ]);

  const promptConnectThen = (cb: (userProfile: Player) => Promise<void>) => {
    callbackRef.current = cb;
    setVisible(true);
  };

  return promptConnectThen;
};

export { useConnectWalletThen, useConnectProfileThen };

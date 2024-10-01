import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useRef } from "react";
import {
  UserContextType,
  useUserProfileContext,
} from "../context/UserProfileContext";

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
    } else if (isUserConnected) {
      callbackRef.current?.();
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

  const callbackRef = useRef<
    ((userProfile: UserContextType["userProfile"]) => void) | null
  >(null);

  useEffect(() => {
    const isAuthFlowPending =
      visible || // wallet modal is open
      userProfileContext.isProfileLoading || // profile is still loading
      !userProfileContext.isProfileFetchInititated; // or profile load has not yet been attempted

    if (isAuthFlowPending) {
      return;
    }
    const isUserRejectedConn = !connected && !connecting;
    const isUserConnected = connected && !connecting;
    if (isUserRejectedConn) {
      callbackRef.current = null;
    } else if (isUserConnected) {
      callbackRef.current?.(userProfileContext.userProfile);
      callbackRef.current = null;
    }
  }, [
    connecting,
    connected,
    userProfileContext.userProfile,
    userProfileContext.isProfileLoading,
    userProfileContext.isProfileFetchInititated,
    visible,
  ]);

  const promptConnectThen = (
    cb: (userProfile: UserContextType["userProfile"]) => Promise<void>,
  ) => {
    callbackRef.current = cb;
    setVisible(true);
  };

  return promptConnectThen;
};

export { useConnectWalletThen, useConnectProfileThen };

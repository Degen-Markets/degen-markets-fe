"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { FC } from "react";
import {
  UserProfileProvider,
  useUserProfileContext,
} from "../context/UserProfileContext";
import UserAvatar from "./UserAvatar";
import { useWallet } from "@solana/wallet-adapter-react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const SolanaWallet = () => {
  return (
    <UserProfileProvider>
      <Content />
    </UserProfileProvider>
  );
};

const Content: FC = () => {
  const { userProfile } = useUserProfileContext();
  const { publicKey, connected, connecting } = useWallet();
  const publicKeyString = publicKey?.toBase58();
  const walletAddrDisplayStr = publicKeyString
    ? `${publicKeyString.slice(0, 4)}...${publicKeyString.slice(-4)}`
    : null;

  return (
    <WalletMultiButton
      style={{
        textWrap: "nowrap",
        background: "#AB9FF2",
        borderRadius: "2rem",
        fontFamily: "inherit",
      }}
      className="!w-full"
    >
      <div className="flex items-center gap-2">
        {connected && walletAddrDisplayStr ? (
          <>
            <UserAvatar
              src={userProfile.twitterPfpUrl}
              className="rounded-full h-12 w-12 absolute top-0 left-0 "
              width={90}
              height={90}
            />
            {walletAddrDisplayStr}
          </>
        ) : (
          <>
            {connecting ? (
              "Connecting..."
            ) : (
              <>
                <Image
                  src={"/navIcons/Wallet.svg"}
                  alt="Wallet"
                  width={24}
                  height={24}
                />
                Connect Wallet
              </>
            )}
          </>
        )}
      </div>
    </WalletMultiButton>
  );
};

export default SolanaWallet;

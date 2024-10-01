"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { useUserProfileContext } from "../../context/UserProfileContext";
import UserAvatar from "../UserAvatar";
import { useWallet } from "@solana/wallet-adapter-react";

// Import default styles and override them
require("@solana/wallet-adapter-react-ui/styles.css");
import "./index.css";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";

const SolanaWallet = () => {
  const { userProfile } = useUserProfileContext();
  const { publicKey, connected, connecting } = useWallet();

  const publicKeyStr = publicKey?.toBase58();
  const walletAddrDisplayStr = publicKeyStr
    ? getDisplayNameForAddress(publicKeyStr)
    : null;

  return (
    <WalletMultiButton>
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

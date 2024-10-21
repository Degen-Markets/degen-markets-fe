"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import UserAvatar from "@/app/components/UserAvatar";
import { useUserProfileContext } from "@/app/context/UserProfileContext";

// Import default styles and override them
import "@solana/wallet-adapter-react-ui/styles.css";
import "./index.css";
import { WalletIcon } from "@heroicons/react/24/outline";

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
              src={userProfile?.twitterPfpUrl}
              className="rounded-full h-10 w-10 absolute top-1 left-1 "
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
                <WalletIcon width={24} />
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

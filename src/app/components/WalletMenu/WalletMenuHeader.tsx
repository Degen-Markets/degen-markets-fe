import Image from "next/image";
import React from "react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

interface WalletMenuHeaderProps {
  displayName: string;
  accountModal: () => void;
}

const WalletMenuHeader: React.FC<WalletMenuHeaderProps> = ({
  displayName,
  accountModal,
}) => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  return (
    <div className="flex items-center justify-center space-x-3 py-5">
      <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center">
        <Image
          src={ensAvatar || "/user-avatars/avatar.png"}
          width={48}
          height={48}
          alt={ensName || "avatarName"}
        />
      </div>
      <div
        className="text-lg leading-4 space-y-1 cursor-pointer"
        onClick={accountModal}
      >
        <p className="text-white">{ensName || "@degen"}</p>
        <p>{displayName}</p>
      </div>
    </div>
  );
};

export default WalletMenuHeader;

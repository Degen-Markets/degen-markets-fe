import React from "react";
import { Address } from "viem";
import { useAccount, useEnsName } from "wagmi";
import UserAvatar from "../UserAvatar";

interface WalletMenuHeaderProps {
  displayName: string;
  accountModal: () => void;
}

const WalletMenuHeader: React.FC<WalletMenuHeaderProps> = ({
  displayName,
  accountModal,
}) => {
  const { address } = useAccount();
  return (
    <div className="flex items-center justify-center space-x-3 py-5">
      <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center">
        <UserAvatar width={100} height={100} address={address as Address} />
      </div>
      <div
        className="text-lg leading-4 space-y-1 cursor-pointer"
        onClick={accountModal}
      >
        <p className="text-white">@degen</p>
        <p>{displayName}</p>
      </div>
    </div>
  );
};

export default WalletMenuHeader;

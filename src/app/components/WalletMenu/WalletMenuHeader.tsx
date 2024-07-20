import React, { useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import UserAvatar from "../UserAvatar";
import AccountDetailDialog from "../Dialog/AccountDetailDialog";
import { Button } from "../Button";

interface WalletMenuHeaderProps {
  displayName: string;
}
const WalletMenuHeader: React.FC<WalletMenuHeaderProps> = ({ displayName }) => {
  const { address } = useAccount();
  return (
    <div className="flex items-center justify-center space-x-3 py-5 rounded-xl">
      <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ">
        <UserAvatar width={100} height={100} address={address as Address} />
      </div>
      <div className="text-lg leading-4 space-y-1 cursor-pointer">
        <AccountDetailDialog>
          <div className="text-sm">
            <p className="text-white">@degen</p>
            <p>{displayName}</p>
          </div>
        </AccountDetailDialog>
      </div>
    </div>
  );
};

export default WalletMenuHeader;

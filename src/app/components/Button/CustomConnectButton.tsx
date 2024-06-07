"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { ButtonGradient } from "@/app/components/Button/index";
import WalletMenu from "../WalletMenu";
import { WalletButton } from "./ButtonWallet";
import { useAccount, useDisconnect } from "wagmi";
import WalletButtonWithAvatar from "../WalletMenu/WalletButtonWithAvatar";

interface Props {
  className?: string;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomConnectButton: React.FC<Props> = ({ className, setNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const { isConnecting } = useAccount();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const walletMenuItems = [
          { title: "Profile", link: "", fn: () => null },
          { title: "My Bets", link: "/my-bets", fn: () => null },
          { title: "Switch Network", link: "", fn: openChainModal },
          { title: "Disconnect", link: "", fn: disconnect },
        ];

        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <div className="flex items-center space-x-2">
                    <WalletButton
                      size="small"
                      onClick={openConnectModal}
                      type="button"
                      loader={true}
                      pendingText="Connecting..."
                      isPending={isConnecting}
                      className={className}
                    >
                      Connect wallet
                    </WalletButton>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <ButtonGradient
                    size="small"
                    onClick={openChainModal}
                    type="button"
                    className={className}
                  >
                    Wrong network
                  </ButtonGradient>
                );
              }

              return (
                <WalletMenu
                  heading={
                    <WalletButtonWithAvatar
                      className={className}
                      displayName={account.displayName}
                      isOpen={isOpen}
                    />
                  }
                  menu={walletMenuItems}
                  accountModal={openAccountModal}
                  account={account}
                  setNav={setNav}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;

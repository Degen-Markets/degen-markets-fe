"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { ButtonGradient } from "@/app/components/Button/index";

interface Props {
  className?: string;
}
export const CustomConnectButton: React.FC<Props> = ({ className }) => {
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
                  <ButtonGradient
                    size="small"
                    onClick={openConnectModal}
                    type="button"
                    className={className}
                  >
                    Connect wallet
                  </ButtonGradient>
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
                <div>
                  <ButtonGradient
                    size="small"
                    onClick={openAccountModal}
                    className={className}
                  >
                    {account.displayName}
                  </ButtonGradient>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

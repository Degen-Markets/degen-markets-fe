"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { ButtonGradient } from "@/app/components/Button/index";

export const CustomConnectButton: React.FC<{}> = ({}) => {
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
                    size={"regular"}
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </ButtonGradient>
                );
              }

              if (chain.unsupported) {
                return (
                  <ButtonGradient
                    size={"regular"}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </ButtonGradient>
                );
              }

              return (
                <div>
                  <ButtonGradient size={"regular"} onClick={openAccountModal}>
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

"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { GradientButton } from "@/app/components/Button/index";

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
                  <GradientButton onClick={openConnectModal} type="button">
                    Connect Wallet
                  </GradientButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <GradientButton onClick={openChainModal} type="button">
                    Wrong network
                  </GradientButton>
                );
              }

              return (
                <div>
                  <GradientButton onClick={openAccountModal}>
                    {account.displayName}
                  </GradientButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

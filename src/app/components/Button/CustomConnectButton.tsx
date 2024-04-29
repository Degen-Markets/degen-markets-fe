"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { ButtonGradient } from "@/app/components/Button/index";
import { ButtonBlue } from "@/app/components/Button/NavbarButtons";

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
                  <ButtonBlue onClick={openConnectModal} type="button">
                    Connect Wallet
                  </ButtonBlue>
                );
              }

              if (chain.unsupported) {
                return (
                  <ButtonBlue onClick={openChainModal} type="button">
                    Wrong network
                  </ButtonBlue>
                );
              }

              return (
                <div>
                  <ButtonBlue onClick={openAccountModal}>
                    {account.displayName}
                  </ButtonBlue>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

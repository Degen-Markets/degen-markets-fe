"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { ButtonGradient, ButtonSecondary } from "@/app/components/Button/index";
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
                  <ButtonGradient
                    size={"small"}
                    onClick={openConnectModal}
                    type="button"
                    className="text-neutral-900"
                  >
                    <div className="text-neutral-900">Connect wallet</div>
                  </ButtonGradient>
                );
              }

              if (chain.unsupported) {
                return (
                  <ButtonGradient
                    size={"small"}
                    onClick={openChainModal}
                    type="button"
                    className="text-neutral-900"
                  >
                    <div className="text-neutral-900">Wrong network</div>
                  </ButtonGradient>
                );
              }

              return (
                <div>
                  <ButtonGradient
                    size={"small"}
                    onClick={openAccountModal}
                    className="text-neutral-900"
                  >
                    <div className="text-neutral-900">
                      {account.displayName}
                    </div>
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

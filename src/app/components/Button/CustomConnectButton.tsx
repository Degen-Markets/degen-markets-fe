"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { ButtonGradient } from "@/app/components/Button/index";
import cx from "classnames";

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
                    size={"small"}
                    onClick={openConnectModal}
                    type="button"
                    className={cx("text-neutral-900", className)}
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
                    className={cx("text-neutral-900", className)}
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
                    className={cx("text-neutral-900", className)}
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

import React, { FC } from "react";
import { WalletButton } from "../Button/ButtonWallet";
import { useAccount, useDisconnect } from "wagmi";
import WalletMenu from "../WalletMenu";
import WalletButtonWithAvatar from "../WalletMenu/WalletButtonWithAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { DialogType, useDialog } from "./dialog";
import useIsChainSupported from "@/app/hooks/useIsChainSupported";
import Image from "next/image";
interface Props {
  className?: string;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Web3Status: FC<Props> = ({ className, setNav }) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);

  const walletMenuItems = [
    { title: "My Bets", link: "/my-bets", fn: () => null },
    { title: "My History", link: "/my-history", fn: () => null },
    { title: "Switch Network", link: "", fn: () => setOpenSwitchChain(true) },
    { title: "Switch Wallet", link: "", fn: () => setOpenConnector(true) },
    { title: "Disconnect", link: "", fn: disconnect },
  ];

  return (
    <div>
      {!isConnected && (
        <>
          <WalletButton
            size="regular"
            onClick={() => setOpenConnector(true)}
            className="space-x-1"
          >
            <Image
              src="/navIcons/Wallet.svg"
              alt="wallet"
              width={25}
              height={25}
            />
            <p className="whitespace-nowrap text-xl">Connect Wallet</p>
          </WalletButton>
        </>
      )}
      {isConnected && address && (
        <>
          {isCurrentChainSupported ? (
            <WalletMenu
              heading={
                <WalletButtonWithAvatar
                  className={className}
                  displayName={getDisplayNameForAddress(address)}
                />
              }
              menu={walletMenuItems}
              account={getDisplayNameForAddress(address)}
              setNav={setNav}
            />
          ) : (
            <>
              <WalletButton
                size="small"
                onClick={() => setOpenSwitchChain(true)}
                className="text-xl"
              >
                Wrong network
              </WalletButton>
            </>
          )}
        </>
      )}
    </div>
  );
};

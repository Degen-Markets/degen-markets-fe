import React, { FC } from "react";
import DialogConnector from "./ConnectorDialog";
import { WalletButton } from "../Button/ButtonWallet";
import { useAccount, useDisconnect } from "wagmi";
import WalletMenu from "../WalletMenu";
import WalletButtonWithAvatar from "../WalletMenu/WalletButtonWithAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { DialogType, useDialog } from "./dialog";
import useIsChainSupported from "@/app/lib/utils/hooks/useIsChainSupported";
interface Props {
  className?: string;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Web3Status: FC<Props> = ({ className, setNav }) => {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);

  const walletMenuItems = [
    { title: "My Bets", link: "/my-bets", fn: () => null },
    { title: "My History", link: "/my-history", fn: () => null },
    { title: "Switch Network", link: "", fn: () => setOpenSwitchChain(true) },
    { title: "Disconnect", link: "", fn: disconnect },
  ];

  return (
    <div>
      {!isConnected && (
        <WalletButton size="small" onClick={() => setOpenConnector(true)}>
          Connect Wallet
        </WalletButton>
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

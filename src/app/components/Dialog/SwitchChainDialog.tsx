import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "./dialog";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { Button } from "../Button";
import Image from "next/image";
import PixelArtLoader from "../PixelArtLoading";
import useIsChainSupported from "@/app/lib/utils/hooks/useIsChainSupported";
import { useToast } from "../Toast/ToastProvider";

const SwitchChainDialog = () => {
  const { open, setOpen } = useDialog(DialogType.SwitchChain);
  const { disconnect } = useDisconnect();
  const { chains, isPending, switchChainAsync } = useSwitchChain();
  const { chainId } = useAccount();
  const [pendingChainId, setPendingChainId] = useState<number>();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { showToast } = useToast();

  const handleSwitchChain = async (chainIdToSwitch: number) => {
    try {
      if (chainId !== chainIdToSwitch) {
        setPendingChainId(chainIdToSwitch);
        await switchChainAsync({ chainId: chainIdToSwitch as any });
      }
    } catch (error: any) {
      console.error(error);
      showToast(error.shortMessage || error, "error");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-4xl">Switch Networks</DialogTitle>
          {!isCurrentChainSupported && (
            <DialogDescription className="!text-2xl">
              Wrong network detected, switch or disconnect to continue.
            </DialogDescription>
          )}
        </DialogHeader>
        <div>
          {chains.map((chain) => (
            <div
              key={chain.id}
              onClick={() => handleSwitchChain(chain.id)}
              className="flex justify-between items-center cursor-pointer border my-2 p-2"
            >
              <div className="flex space-x-2 items-center">
                <Image
                  src={`/chainWalletIcon/${chain.name.toLowerCase()}.svg`}
                  alt={`${chain.name}`}
                  width={30}
                  height={30}
                />
                <p>{chain.name}</p>
              </div>
              <div className="text-white">
                {isPending && chain.id === pendingChainId ? (
                  <PixelArtLoader
                    text="Switching..."
                    loaderColor="bg-white"
                    textColor="text-white"
                  />
                ) : chainId === chain.id ? (
                  <p>Connected</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <Button
          size="small"
          className="text-white"
          onClick={() => {
            disconnect();
            setOpen(false);
          }}
        >
          Disconnect
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainDialog;

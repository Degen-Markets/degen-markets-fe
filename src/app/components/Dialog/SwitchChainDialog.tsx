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
import { useAccount, useSwitchChain } from "wagmi";
import Image from "next/image";
import PixelArtLoader from "../PixelArtLoading";
import useIsChainSupported from "@/app/hooks/useIsChainSupported";
import { useToast } from "../Toast/ToastProvider";
import GradientText from "../WalletMenu/GradientText";
type ChainType = 8453;

const SwitchChainDialog = () => {
  const { open, setOpen } = useDialog(DialogType.SwitchChain);
  const { chains, isPending, switchChain } = useSwitchChain();
  const { chainId } = useAccount();
  const [pendingChainId, setPendingChainId] = useState<number>();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { showToast } = useToast();

  const handleSwitchChain = (chainIdToSwitch: ChainType) => {
    try {
      if (chainId !== chainIdToSwitch) {
        setPendingChainId(chainIdToSwitch);
        switchChain({ chainId: chainIdToSwitch });
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
          <DialogTitle className="!text-4xl">
            <GradientText>Switch Networks</GradientText>
          </DialogTitle>
          {!isCurrentChainSupported && (
            <DialogDescription className="!text-2xl">
              Wrong network detected, switch to continue.
            </DialogDescription>
          )}
        </DialogHeader>
        <div>
          {chains.map((chain) => (
            <div
              key={chain.id}
              onClick={() => handleSwitchChain(chain.id as ChainType)}
              className="flex justify-between items-center cursor-pointer border rounded-xl my-2 p-2"
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
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p>Connected</p>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainDialog;

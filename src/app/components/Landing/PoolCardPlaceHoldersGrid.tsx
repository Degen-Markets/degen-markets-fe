import React, { useCallback } from "react";
import { Button } from "../Button/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useToast } from "../Toast/ToastProvider";

const PoolPlaceholderCard = () => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { showToast } = useToast();

  const handleClick = useCallback(() => {
    if (!connected) {
      setVisible(true);
      return;
    }

    // TODO: Once DGM is released, we will actually check if the connected wallet has those tokens
    showToast(
      "You need at least 1,000 $DGM tokens to be able to create a pool on Degen Markets",
      "error",
    );
  }, [connected, setVisible, showToast]);

  return (
    <div className="group relative w-full h-60 bg-blue-light rounded-xl center-all text-center p-4 bg-opacity-50 hover:scale-105 hover:shadow transition-all ease duration-300">
      <div className="absolute inset-0 bg-black-main bg-opacity-0 group-hover:bg-opacity-70 rounded-xl transition-all ease duration-300" />
      <div className="z-10">
        <span className="text-5xl text-cadet-blue-light font-bold group-hover:opacity-0 transition-all ease duration-300">
          +
        </span>
        <Button
          size="regular"
          className="!h-auto bg-opacity-90 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all ease duration-300"
          onClick={handleClick}
        >
          Create Pool
        </Button>
      </div>
    </div>
  );
};

const PoolCardPlaceHoldersGrid = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, ind) => (
        <PoolPlaceholderCard key={ind} />
      ))}
    </>
  );
};

export default PoolCardPlaceHoldersGrid;

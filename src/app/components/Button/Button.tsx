import { Tx } from "@/app/lib/utils/bets/types";
import { ButtonHTMLAttributes, FC } from "react";
import PixelArtLoader from "../PixelArtLoading";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: string;
  size: "regular" | "small";
  loader?: boolean;
  txState?: Tx;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  customStyle = "",
  loader = false,
  txState = Tx.Idle,
  ...props
}) => {
  const buttonSize = size === "regular" ? "h-10 md:h-12" : "h-8 md:h-10";
  const isIdle = txState === Tx.Idle;
  const isPending = txState === Tx.Pending;
  const isClaimProcessing = txState === Tx.Processing;

  return (
    <button
      className={`text-prussian-dark py-2 px-2 md:px-4 shadow-button flex items-center justify-center active:shadow-button-pressed my-auto ${className} ${buttonSize}`}
      {...props}
    >
      {isIdle && children}
      {isPending && loader && (
        <PixelArtLoader text="Pending..." textSize="2xl" />
      )}
      {isClaimProcessing && loader && (
        <PixelArtLoader text="Processing..." textSize="2xl" />
      )}
    </button>
  );
};

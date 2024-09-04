import { VariantProps } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Dispatch, SetStateAction } from "react";
import {
  dialogOverlayVariants,
  dialogVariants,
} from "../lib/utils/dialog/constant";
import { Address } from "../lib/utils/bets/types";

export enum DialogType {
  Connector,
}

export interface DialogContextProps {
  state: Record<DialogType, boolean>;
  setState: Dispatch<SetStateAction<Record<DialogType, boolean>>>;
}

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof dialogOverlayVariants> {}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {
  hideClose?: boolean;
}

export interface ProfileDetailsProps {
  address: Address;
  balance:
    | {
        decimals: number;
        formatted: string;
        symbol: string;
        value: bigint;
      }
    | undefined;
  onDisconnect: () => void;
}

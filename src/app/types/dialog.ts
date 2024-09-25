import { VariantProps } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Dispatch, SetStateAction } from "react";
import {
  dialogOverlayVariants,
  dialogVariants,
} from "../lib/utils/dialog/constant";

export enum DialogType {
  Connector,
  signature,
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

import { cva, VariantProps } from "class-variance-authority";
import { Drawer as DrawerPrimitive } from "vaul";
import {
  drawerOverlayVariants,
  drawerVariants,
} from "../lib/utils/drawer/constants";

export interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>,
    VariantProps<typeof drawerOverlayVariants> {}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  hideClose?: boolean;
}

export enum DrawerType {
  Profile = "profile",
}

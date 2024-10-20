"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import cn from "classnames";
import {
  DrawerContentProps,
  DrawerOverlayProps,
  drawerOverlayVariants,
  DrawerType,
  drawerVariants,
} from "./type";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, variant, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={drawerOverlayVariants({ variant, className })}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, variant, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={drawerVariants({ variant, className })}
      {...props}
    >
      <div className="mx-auto my-4 h-2 w-[100px] rounded-full bg-lavender-blue" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cn("", className)} {...props} />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const DrawerContext = React.createContext<
  | {
      state: Record<DrawerType, boolean>;
      setState: React.Dispatch<
        React.SetStateAction<Record<DrawerType, boolean>>
      >;
    }
  | undefined
>(undefined);

const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = React.useState<Record<DrawerType, boolean>>({
    [DrawerType.Settings]: false, // example use case
  });

  return (
    <DrawerContext.Provider value={{ state, setState }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = (type: DrawerType) => {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  const { state, setState } = context;
  return React.useMemo(
    () => ({
      open: Boolean(state[type]),
      setOpen: (val: boolean) => setState((prev) => ({ ...prev, [type]: val })),
    }),
    [state, setState, type],
  );
};

export {
  DrawerProvider,
  useDrawer,
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

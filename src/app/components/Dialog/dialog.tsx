"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import classNames from "classnames";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import {
  DialogContentProps,
  DialogContextProps,
  DialogOverlayProps,
  DialogType,
} from "@/app/types/dialog";
import {
  dialogCloseVariants,
  dialogOverlayVariants,
  dialogVariants,
} from "@/app/lib/utils/dialog/constant";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={classNames(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={dialogOverlayVariants({ variant, className })}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    { className, hideClose: _hideClose = false, variant, children, ...props },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay variant={variant} />
      <DialogPrimitive.Content
        ref={ref}
        className={dialogVariants({ variant, className })}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          asChild
          className={dialogCloseVariants({ variant })}
        >
          <XMarkIcon width={24} className="text-white" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={classNames(
      "text-3xl md:text-4xl font-semibold leading-none tracking-tight mr-5 md:mr-16 text-left",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={classNames(
      "text-md md:text-lg text-muted-foreground mr:5 md:mr-16",
      className,
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Record<DialogType, boolean>>({
    [DialogType.Connector]: false,
    [DialogType.signature]: false,
  });

  return (
    <DialogContext.Provider value={{ state, setState }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = (type: DialogType) => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Hook can only be used inside Modal Context");
  }

  const { state, setState } = context;

  return useMemo(
    () => ({
      open: Boolean(state[type]),
      setOpen: (val: boolean) => setState((prev) => ({ ...prev, [type]: val })),
    }),
    [state, setState, type],
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPrimitive,
  DialogProvider,
  DialogTitle,
  DialogTrigger,
  DialogType,
  useDialog,
};

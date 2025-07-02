"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;
export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

function Dialog({ ref, ...props }: DialogProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  // @ts-expect-error: ref is not a valid prop for DialogPrimitive.Root
  return <DialogPrimitive.Root data-slot="dialog" ref={ref} {...props} />;
}
Dialog.displayName = "Dialog";

function DialogTrigger({ ref, ...props }: DialogTriggerProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" ref={ref} {...props} />;
}
DialogTrigger.displayName = "DialogTrigger";

function DialogContent({ ref, className, children, ...props }: DialogContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
DialogContent.displayName = "DialogContent";

function DialogHeader({ ref, className, ...props }: DialogHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="dialog-header" className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
}
DialogHeader.displayName = "DialogHeader";

function DialogFooter({ ref, className, ...props }: DialogFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="dialog-footer" className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
}
DialogFooter.displayName = "DialogFooter";

function DialogTitle({ ref, className, ...props }: DialogTitleProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) {
  return <DialogPrimitive.Title ref={ref} data-slot="dialog-title" className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}
DialogTitle.displayName = "DialogTitle";

function DialogDescription({ ref, className, ...props }: DialogDescriptionProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) {
  return <DialogPrimitive.Description ref={ref} data-slot="dialog-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
DialogDescription.displayName = "DialogDescription";

function DialogClose({ ref, className, ...props }: DialogCloseProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return <DialogPrimitive.Close ref={ref} data-slot="dialog-close" className={cn("", className)} {...props} />;
}
DialogClose.displayName = "DialogClose";

const DialogCompound = Object.assign(Dialog, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});

export { DialogCompound as Dialog };

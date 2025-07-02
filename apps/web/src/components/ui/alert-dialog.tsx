"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AlertDialogProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>;
export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>;
export type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>;
export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>;
export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>;
export type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>;
export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>;

function AlertDialog({ ref, ...props }: AlertDialogProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" ref={ref} {...props} />;
}
AlertDialog.displayName = "AlertDialog";

function AlertDialogTrigger({ ref, ...props }: AlertDialogTriggerProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" ref={ref} {...props} />;
}
AlertDialogTrigger.displayName = "AlertDialogTrigger";

function AlertDialogContent({ ref, className, ...props }: AlertDialogContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <AlertDialogPrimitive.Content
        ref={ref}
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}
AlertDialogContent.displayName = "AlertDialogContent";

function AlertDialogHeader({ ref, className, ...props }: AlertDialogHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="alert-dialog-header" className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}
AlertDialogHeader.displayName = "AlertDialogHeader";

function AlertDialogFooter({ ref, className, ...props }: AlertDialogFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="alert-dialog-footer" className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
}
AlertDialogFooter.displayName = "AlertDialogFooter";

function AlertDialogTitle({ ref, className, ...props }: AlertDialogTitleProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) {
  return <AlertDialogPrimitive.Title ref={ref} data-slot="alert-dialog-title" className={cn("text-lg font-semibold", className)} {...props} />;
}
AlertDialogTitle.displayName = "AlertDialogTitle";

function AlertDialogDescription({ ref, className, ...props }: AlertDialogDescriptionProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) {
  return <AlertDialogPrimitive.Description ref={ref} data-slot="alert-dialog-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
AlertDialogDescription.displayName = "AlertDialogDescription";

function AlertDialogAction({ ref, className, ...props }: AlertDialogActionProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return <AlertDialogPrimitive.Action ref={ref} data-slot="alert-dialog-action" className={cn(buttonVariants(), className)} {...props} />;
}
AlertDialogAction.displayName = "AlertDialogAction";

function AlertDialogCancel({ ref, className, ...props }: AlertDialogCancelProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return <AlertDialogPrimitive.Cancel ref={ref} data-slot="alert-dialog-cancel" className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)} {...props} />;
}
AlertDialogCancel.displayName = "AlertDialogCancel";

const AlertDialogCompound = Object.assign(AlertDialog, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});

export { AlertDialogCompound as AlertDialog };

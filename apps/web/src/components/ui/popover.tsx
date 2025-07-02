"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "@/lib/utils";

export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  matchTriggerWidth?: boolean;
};
export type PopoverAnchorProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>;

function Popover({ ref, ...props }: PopoverProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  // @ts-expect-error: ref should be optional
  return <PopoverPrimitive.Root data-slot="popover" ref={ref} {...props} />;
}
Popover.displayName = "Popover";

function PopoverTrigger({ ref, ...props }: PopoverTriggerProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" ref={ref} {...props} />;
}
PopoverTrigger.displayName = "PopoverTrigger";

function PopoverContent({ ref, className, align = "center", sideOffset = 4, matchTriggerWidth = false, ...props }: PopoverContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
          { "w-[var(--radix-popover-trigger-width)]": matchTriggerWidth },
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
PopoverContent.displayName = "PopoverContent";

function PopoverAnchor({ ref, ...props }: PopoverAnchorProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" ref={ref} {...props} />;
}
PopoverAnchor.displayName = "PopoverAnchor";

const PopoverCompound = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
});

export { PopoverCompound as Popover };

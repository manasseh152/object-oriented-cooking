import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@/lib/utils";

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  disabled?: boolean;
};

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex flex-col gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      aria-disabled={props.disabled}
      {...props}
    />
  );
}

Label.displayName = "Label";

export type LabelTextProps = React.HTMLProps<HTMLSpanElement>;

function LabelText({ className, ...props }: LabelTextProps) {
  return (
    <span
      data-slot="label-text"
      className={cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

LabelText.displayName = "LabelText";

const LabelCompound = Object.assign(Label, {
  Text: LabelText,
});

export { LabelCompound as Label };

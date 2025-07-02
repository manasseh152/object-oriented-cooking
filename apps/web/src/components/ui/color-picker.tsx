import type { HTMLProps } from "react";

import * as v from "valibot";

import { cn } from "@/lib/utils";

export type ColorPickerProps = Omit<HTMLProps<HTMLInputElement>, "type" | "onChange"> & {
  onChange: (value: string) => void;
  name: string;
};

export function ColorPicker({ className, onChange, ...props }: ColorPickerProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const color = v.safeParse(v.pipe(v.string(), v.hexColor()), e.target.value);

    if (!color.success)
      return;

    onChange(color.output);
  }

  return (
    <input
      {...props}
      type="color"
      className={cn(
        "flex h-10 w-10 rounded-sm border border-input-border bg-transparent border-box p-px m-0 text-sm transition duration-100 hover:border-input-border-hover hover:shadow-input-hover focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onChange={handleChange}
    />
  );
}
ColorPicker.displayName = "ColorPicker";

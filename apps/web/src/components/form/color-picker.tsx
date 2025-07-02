/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { ColorPickerProps as PrimitiveColorPickerProps } from "@/components/ui/color-picker";

import { ColorPicker as PrimitiveColorPicker } from "@/components/ui/color-picker";
import { useEffect, useState } from "react";

import type { PrimativeFieldProps, PrimativeFormPropsOmit } from "@/lib/utils";

import { debounce } from "@/lib/utils";

export type ColorPickerProps = Omit<PrimitiveColorPickerProps, PrimativeFormPropsOmit> & PrimativeFieldProps<string | null> & {
  defaultColor?: `#${string}`; // Optional default color in hex format
};

export function ColorPicker(props: ColorPickerProps) {
  const {
    name,
    value,
    onChange,
    onBlur,
    className,
    disabled,
    defaultColor = "#000000", // Default color set to black
    ...restProps
  } = props;

  const [color, setColor] = useState(value ?? defaultColor ?? "");
  const id = `color-picker-${name}`;

  useEffect(() => {
    setColor(value ?? defaultColor ?? "");
  }, [defaultColor, value]);

  useEffect(() => {
    const debouncedOnChange = debounce((color: string) => {
      if (color === "") {
        onChange(null);
      }
      else {
        onChange(color);
      }
    }, 500);

    debouncedOnChange(color);

    return () => debouncedOnChange.cancel();
  }, [color, onChange]);

  function handleColorChange(color: string) {
    setColor(color);
  }

  return (
    <PrimitiveColorPicker
      {...restProps}
      id={id}
      name={name}
      value={color}
      onChange={handleColorChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
}

ColorPicker.displayName = "ColorPicker";

import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { ColorPickerProps } from "../form/color-picker";

import { useFieldContext } from "../../hooks/use-form-context";
import { ColorPicker } from "../form/color-picker";

export type ColorPickerFieldProps = Omit<ColorPickerProps, PrimativeFieldPropsOmit | "onColorChange"> & {};

export function ColorPickerField(props: ColorPickerFieldProps) {
  const field = useFieldContext<string | null>();

  return (
    <ColorPicker
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

ColorPickerField.displayName = "ColorPickerField";

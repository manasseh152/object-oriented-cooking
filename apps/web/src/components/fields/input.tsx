import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { InputProps, TextFieldValueType } from "../form/input";

import { useFieldContext } from "../../hooks/use-form-context";
import { Input } from "../form/input";

export type InputFieldProps = Omit<InputProps, PrimativeFieldPropsOmit> & {};

export function InputField<T extends TextFieldValueType>(props: InputFieldProps) {
  const field = useFieldContext<T>();

  return (
    <Input
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

InputField.displayName = "InputField";

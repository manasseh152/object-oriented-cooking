import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { CheckboxProps } from "../form/checkbox";

import { useFieldContext } from "../../hooks/use-form-context";
import { Checkbox } from "../form/checkbox";

export type CheckboxFieldProps = Omit<CheckboxProps, PrimativeFieldPropsOmit> & {};

export function CheckboxField(props: CheckboxFieldProps) {
  const field = useFieldContext<boolean | null>();

  return (
    <Checkbox
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

CheckboxField.displayName = "CheckboxField";

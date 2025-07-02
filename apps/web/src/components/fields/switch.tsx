import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { SwitchProps } from "../form/switch";

import { useFieldContext } from "../../hooks/use-form-context";
import { Switch } from "../form/switch";

export type SwitchFieldProps = Omit<SwitchProps, PrimativeFieldPropsOmit> & {};

export function SwitchField(props: SwitchFieldProps) {
  const field = useFieldContext<boolean | null>();

  return (
    <Switch
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

SwitchField.displayName = "SwitchField";

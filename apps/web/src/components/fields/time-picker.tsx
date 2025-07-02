import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { TimePickerProps, TimePickerValueType } from "../form/time-picker";

import { useFieldContext } from "../../hooks/use-form-context";
import { TimePicker } from "../form/time-picker";

export type TimePickerFieldProps<TValue extends TimePickerValueType> = Omit<TimePickerProps<TValue>, PrimativeFieldPropsOmit> & {};

export function TimePickerField<TValue extends TimePickerValueType>(props: TimePickerFieldProps<TValue>) {
  const field = useFieldContext<TValue>();

  return (
    <TimePicker
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

TimePickerField.displayName = "TimePickerField";

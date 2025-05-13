import type { PrimitiveValueType } from '@/components/form/form-utils';

import { useFieldContext } from '@/components/form-fields/form-context';
import { FormSelect } from '@/components/form/select';

export type SelectOption<T extends PrimitiveValueType> = {
  value: NoInfer<T>;
  label: string;
};

export type SelectFieldProps<T extends PrimitiveValueType> = {
  className?: string;
  placeholder?: string;

  /** Array of options with value and label */
  options: SelectOption<T>[];
  clearLabel?: string;
  clearable?: boolean;
  disabled?: boolean;
  field: { state: { value: T } };
};

export function SelectField<T extends PrimitiveValueType>(
  props: SelectFieldProps<T>,
) {
  const field = useFieldContext<T>();

  return (
    <FormSelect
      value={field.state.value}
      onValueChange={value => field.handleChange(value)}
      className={props.className}
      placeholder={props.placeholder}
      options={props.options}
      clearLabel={props.clearLabel}
      clearable={props.clearable}
      disabled={props.disabled}
    />
  );
}

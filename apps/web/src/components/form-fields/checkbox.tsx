import type { HTMLAttributes } from 'react';

import { useFieldContext } from '@/components/form-fields/form-context';
import { FormCheckbox } from '@/components/form/checkbox';

type CheckboxFieldProps = HTMLAttributes<HTMLDivElement> & {
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  field: { state: { value: boolean } };
};

export function CheckboxField(props: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormCheckbox
      id={id}
      value={!!field.state.value}
      onChange={value => field.handleChange(value as boolean)}
      onBlur={field.handleBlur}
      label={props.label}
      disabled={props.disabled}
      className={props.className}
    />
  );
}

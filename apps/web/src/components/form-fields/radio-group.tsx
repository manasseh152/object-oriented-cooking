import type {
  PrimitiveValueType,
} from '@/components/form/form-utils';

import { useFieldContext } from '@/components/form-fields/form-context';
import {
  FormRadioGroup,
  FormRadioGroupItem,
} from '@/components/form/radio-group';

type RadioGroupFieldProps<TValue extends PrimitiveValueType> = {
  className?: string;
  defaultValue?: TValue;
  field: { state: { value: TValue } };
} & React.PropsWithChildren<object>;

export function RadioGroupField<TValue extends PrimitiveValueType>(
  props: RadioGroupFieldProps<TValue>,
) {
  const field = useFieldContext<TValue>();

  return (
    <FormRadioGroup
      value={field.state.value}
      onChange={value => field.handleChange(value)}
      className={props.className}
      defaultValue={props.defaultValue}
    >
      {props.children}
    </FormRadioGroup>
  );
}

type RadioGroupItemFieldProps<TValue extends PrimitiveValueType> = {
  /**
   * The value of this radio button.
   */
  value: NoInfer<TValue>;
  label: string;
  className?: string;
  field: { state: { value: TValue } };
};

export function RadioGroupItemField<TValue extends PrimitiveValueType>(
  props: RadioGroupItemFieldProps<TValue>,
) {
  return (
    <FormRadioGroupItem
      value={props.value}
      label={props.label}
      className={props.className}
    />
  );
}

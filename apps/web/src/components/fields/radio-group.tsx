import type { ComponentPropsWithRef, ReactNode } from "react";

import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";

import type { OptionFieldContextState } from "../../hooks/use-option-field";
import type { PrimativeFieldPropsOmit, PrimativeLabelType, PrimitiveValueType } from "../../lib/utils";
import type { RadioGroupProps as PrimativeRadioGroupProps, RadioGroupOption } from "../form/radio-group";

import { useFieldContext } from "../../hooks/use-form-context";
import { OptionFieldContext, useOptionField } from "../../hooks/use-option-field";
import { RadioGroup as PrimativeRadioGroup } from "../form/radio-group";

export type RadioGroupProps<TValue extends PrimitiveValueType> = {
  options: RadioGroupOption<TValue>[];
  children: ReactNode;
};

export function RadioGroup<TValue extends PrimitiveValueType>(props: RadioGroupProps<TValue>) {
  const { options, children } = props;

  const value = useMemo<OptionFieldContextState<RadioGroupOption<TValue>>>(() => ({
    options,
  }), [options]);

  return <OptionFieldContext value={value} children={children} />;
}

RadioGroup.displayName = "RadioGroup";

export type RadioGroupFieldProps<TValue extends PrimitiveValueType> = Omit<PrimativeRadioGroupProps<TValue>, PrimativeFieldPropsOmit | "options"> & {};

export function RadioGroupField<TValue extends PrimitiveValueType>(props: RadioGroupFieldProps<TValue>) {
  const field = useFieldContext<TValue>();
  const { options } = useOptionField<RadioGroupOption<TValue>>();

  return (
    <PrimativeRadioGroup
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      options={options}
      {...props}
    />
  );
}

RadioGroup.Field = RadioGroupField;
RadioGroupField.displayName = "RadioGroupField";

export type RadioGroupTriggerProps = Omit<ComponentPropsWithRef<typeof Button>, "children"> & {
  placeholder?: PrimativeLabelType;
};

export function RadioGroupTrigger(props: RadioGroupTriggerProps) {
  const { placeholder = "Select option", ...restProps } = props;

  const field = useFieldContext<PrimitiveValueType>();
  const { options } = useOptionField<RadioGroupOption<PrimitiveValueType>>();

  const selectedOption = options.find(option => option.value === field.state.value);

  return (
    <Button
      variant="input"
      {...restProps}
    >
      {selectedOption?.label || placeholder}
      <ChevronDown />
    </Button>
  );
}

RadioGroup.Trigger = RadioGroupTrigger;
RadioGroupTrigger.displayName = "RadioGroupFieldTrigger";

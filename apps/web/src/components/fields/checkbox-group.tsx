import type { ComponentPropsWithRef, ReactNode } from "react";

import { ChevronDown, X } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { OptionFieldContextState } from "../../hooks/use-option-field";
import type { PrimativeFieldPropsOmit, PrimativeLabelType, PrimitiveValueType } from "../../lib/utils";
import type { CheckboxGroupOption, CheckboxGroupProps } from "../form/checkbox-group";

import { useFieldContext } from "../../hooks/use-form-context";
import { OptionFieldContext, useOptionField } from "../../hooks/use-option-field";
import { CheckboxGroup as PrimativeCheckBoxGroup } from "../form/checkbox-group";

export type CheckboxGrpupProps<TValue extends PrimitiveValueType> = {
  options: CheckboxGroupOption<TValue>[];
  children: ReactNode;
};

export function CheckboxGroup<TValue extends PrimitiveValueType>(props: CheckboxGrpupProps<TValue>) {
  const { options, children } = props;

  const value = useMemo<OptionFieldContextState<CheckboxGroupOption<TValue>>>(() => ({
    options,
  }), [options]);

  return <OptionFieldContext value={value} children={children} />;
}

CheckboxGroup.displayName = "CheckboxGroup";

export type CheckboxGroupFieldProps<TValue extends PrimitiveValueType> = Omit<CheckboxGroupProps<TValue>, PrimativeFieldPropsOmit | "options"> & {};

export function CheckboxGroupField<TValue extends PrimitiveValueType>(props: CheckboxGroupFieldProps<TValue>) {
  const field = useFieldContext<TValue[] | null>();
  const { options } = useOptionField();

  return (
    <PrimativeCheckBoxGroup
      name={field.name}
      value={field.state.value ?? []}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      options={options as CheckboxGroupOption<TValue>[]}
      {...props}
    />
  );
}

CheckboxGroup.Field = CheckboxGroupField;
CheckboxGroupField.displayName = "CheckboxGroupField";

export type CheckboxGroupTriggerProps = Omit<ComponentPropsWithRef<typeof Button>, "children"> & {
  placeholder?: PrimativeLabelType;
};

export function CheckboxGroupTrigger(props: CheckboxGroupTriggerProps) {
  const { placeholder = "Select options", ...restProps } = props;

  const field = useFieldContext<PrimitiveValueType[] | null>();
  const { options } = useOptionField<CheckboxGroupOption<PrimitiveValueType>>();

  const selectedOptions = useMemo(() =>
    options.filter(option => field.state.value?.includes(option.value)), [field.state.value, options]);

  return (
    <Button
      variant="input"
      className="justify-start"
      {...restProps}
    >
      <div className="w-full flex items-center gap-2 overflow-hidden">
        {selectedOptions.length > 0
          ? selectedOptions.map((option) => {
              const stringValue = String(option.value);
              const id = `checkbox-group-${field.name}-${stringValue}`;
              return (
                <Badge
                  key={stringValue}
                  id={id}
                  variant="outline"
                  className="flex items-center gap-2 text-xs font-normal text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    field.setValue(prev => prev?.filter(v => v !== option.value) || null);
                  }}
                  aria-label={`Remove ${option.label}`}
                  aria-describedby={id}
                  aria-checked={true}
                  role="checkbox"
                >
                  {option.label}
                  <X size={12} />
                </Badge>
              );
            })
          : <span className="text-sm text-muted-foreground">{placeholder}</span>}
      </div>
      {selectedOptions.length > 0 && (
        <span className="text-sm">
          {selectedOptions.length}
          {" "}
          selected
        </span>
      )}
      <ChevronDown />
    </Button>
  );
}

CheckboxGroup.Trigger = CheckboxGroupTrigger;
CheckboxGroupTrigger.displayName = "CheckboxGroupTrigger";

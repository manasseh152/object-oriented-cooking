/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { ComponentPropsWithRef, ReactNode } from "react";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import type { Option } from "@/lib/option";
import type { PrimativeFieldProps, PrimativeFormPropsOmit, PrimativeLabelType, PrimitiveValueType } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup as PrimitiveRadioGroup, RadioGroupItem as PrimitiveRadioGroupItem } from "@/components/ui/radio-group";
import { createValueMapsFromOptions } from "@/lib/option";
import { cn } from "@/lib/utils";

export type RadioGroupOption<T extends PrimitiveValueType> = Option<T> & {
  disabled?: boolean;
  selected?: boolean;
};

export type RadioGroupItemProps<T extends PrimitiveValueType> = Omit<ComponentPropsWithRef<typeof PrimitiveRadioGroupItem>, "onSelect"> & {
  option: RadioGroupOption<T>;
  name?: string;
  stringValue: string;
  disabled?: boolean;
  selected?: boolean;
  onSelect?: (value: string) => void;
};

export function DefaultRadioGroupItem<T extends PrimitiveValueType>({
  name,
  option,
  stringValue,
  disabled,
  selected,
  onSelect,
  ...props
}: RadioGroupItemProps<T>) {
  const id = `radio-${name}-${stringValue}`;

  return (
    <Label key={stringValue} disabled={disabled} className="flex flex-row items-center gap-2 cursor-pointer">
      <PrimitiveRadioGroupItem
        id={id}
        {...props}
      />
      {option.label}
    </Label>
  );
}

DefaultRadioGroupItem.displayName = "DefaultRadioGroupItem";

export function ButtonRadioGroupItem<T extends PrimitiveValueType>({
  name,
  option,
  stringValue,
  disabled,
  selected,
  onSelect,
  ...props
}: RadioGroupItemProps<T>) {
  const id = `radio-${name}-${stringValue}`;

  return (
    <Button
      id={id}
      key={id}
      variant={selected ? "default" : "secondary"}
      className="flex items-center gap-2 cursor-pointer"
      disabled={disabled}
      onClick={() => onSelect?.(stringValue)}
      {...props}
    >
      {option.label}
    </Button>
  );
}

ButtonRadioGroupItem.displayName = "ButtonRadioGroupItem";

export type RadioGroupProps<T extends PrimitiveValueType> = Omit<ComponentPropsWithRef<typeof PrimitiveRadioGroup>, PrimativeFormPropsOmit> & PrimativeFieldProps<T> & {
  options: RadioGroupOption<T>[];
  orientation?: "horizontal" | "vertical";
  renderItem?: (props: RadioGroupItemProps<T>) => ReactNode;
};

export function RadioGroup<T extends PrimitiveValueType>(props: RadioGroupProps<T>) {
  const {
    name,
    value,
    onChange,
    onBlur,
    options,
    className,
    disabled,
    orientation = "vertical",
    renderItem: RenderItem = DefaultRadioGroupItem,
    ...restProps
  } = props;

  const [selectedValue, setSelectedValue] = useState<T | undefined>(value);

  const { valueToString } = createValueMapsFromOptions(options);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <PrimitiveRadioGroup
      className={cn(
        "flex gap-2",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      name={name}
      value={valueToString.get(selectedValue) || String(selectedValue)}
      onValueChange={(value) => {
        const newValue = valueToString.get(value) as T;
        setSelectedValue(newValue);
        onChange(newValue);
      }}
      onBlur={onBlur}
      disabled={disabled}
      aria-disabled={disabled}
      data-disabled={disabled}
      {...restProps}
    >
      {options.map((option) => {
        const stringValue = valueToString.get(option.value) || String(option.value);

        return (
          <RenderItem
            key={`radio-${name}-${stringValue}`}
            name={name}
            option={option}
            stringValue={stringValue}
            value={stringValue}
            disabled={disabled || option.disabled}
            onSelect={(value) => {
              const newValue = valueToString.get(value) as T;
              setSelectedValue(newValue);
              onChange(newValue);
            }}
            selected={selectedValue === option.value}
          />
        );
      })}
    </PrimitiveRadioGroup>
  );
}

RadioGroup.displayName = "RadioGroup";
RadioGroup.Item = DefaultRadioGroupItem;
RadioGroup.ButtonItem = ButtonRadioGroupItem;

export type RadioGroupTriggerProps<TValue extends PrimitiveValueType> = Omit<ComponentPropsWithRef<typeof Button>, "children"> & {
  option?: RadioGroupOption<TValue>;
  placeholder?: PrimativeLabelType;
};

export function RadioGroupTrigger<TValue extends PrimitiveValueType>({ option, placeholder, ...props }: RadioGroupTriggerProps<TValue>) {
  return (
    <Button variant="input" {...props}>
      {option?.label || placeholder}
      <ChevronDown />
    </Button>
  );
}

RadioGroup.Trigger = RadioGroupTrigger;
RadioGroupTrigger.displayName = "RadioGroupTrigger";

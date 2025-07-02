/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { ComponentPropsWithRef, HTMLAttributes, ReactNode } from "react";

import { useEffect, useMemo, useState } from "react";

import type { Option } from "@/lib/option";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createValueMapsFromOptions } from "@/lib/option";
import { cn } from "@/lib/utils";

import type { PrimativeFieldProps, PrimativeFormPropsOmit, PrimitiveValueType } from "../../lib/utils";

export type CheckboxGroupOption<T extends PrimitiveValueType> = Option<T> & {};

export type CheckboxGroupItemProps<T extends PrimitiveValueType> = Omit<ComponentPropsWithRef<typeof Checkbox>, "onCheckedChange"> & {
  option: CheckboxGroupOption<T>;
  name?: string;
  stringValue: string;
  disabled?: boolean;
  isChecked: boolean;
  onCheckedChange: (checked: boolean, option: Option<T>) => void;
};

export function DefaultCheckboxGroupItem<T extends PrimitiveValueType>({
  name,
  option,
  stringValue,
  disabled,
  isChecked,
  onCheckedChange,
  ...props
}: CheckboxGroupItemProps<T>) {
  const id = `checkbox-group-${name}-${stringValue}`;

  return (
    <Label key={stringValue} disabled={disabled} className="flex flex-row items-center gap-2 cursor-pointer">
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={checked => onCheckedChange(!!checked, option)}
        disabled={disabled}
        {...props}
      />
      <span className="text-sm">{option.label}</span>
    </Label>
  );
}

DefaultCheckboxGroupItem.displayName = "DefaultCheckboxGroupItem";

export type CheckboxGroupProps<T extends PrimitiveValueType> = Omit<HTMLAttributes<HTMLDivElement>, PrimativeFormPropsOmit> & PrimativeFieldProps<T[]> & {
  options: CheckboxGroupOption<T>[];
  orientation?: "horizontal" | "vertical";
  renderItem?: (props: CheckboxGroupItemProps<T>) => ReactNode;
};

export function CheckboxGroup<T extends PrimitiveValueType>(props: CheckboxGroupProps<T>) {
  const {
    name,
    value,
    onChange,
    onBlur,
    options,
    className,
    disabled,
    orientation = "vertical",
    renderItem: RenderItem = DefaultCheckboxGroupItem,
    ...restProps
  } = props;

  const [selectedValues, setSelectedValues] = useState<T[]>([]);

  const { valueToString } = useMemo(() => createValueMapsFromOptions(options), [options]);

  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  function handleCheckedChange(checked: boolean, option: Option<T>) {
    const newValue = checked
      ? [...selectedValues, option.value]
      : selectedValues.filter(v => v !== option.value);

    onChange(newValue);
  }

  function isOptionChecked(option: Option<T>) {
    return selectedValues.includes(option.value);
  }

  return (
    <div
      className={cn(
        "flex gap-2",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...restProps}
    >
      {options.map((option) => {
        const stringValue = valueToString.get(option.value) || String(option.value);

        function itemOnCheckedChange(checked: boolean, opt: Option<T>) {
          handleCheckedChange(checked, opt);
        };

        return (
          <RenderItem
            key={`checkbox-group-${name}-${stringValue}`}
            name={name}
            option={option}
            stringValue={stringValue}
            isChecked={isOptionChecked(option)}
            onCheckedChange={itemOnCheckedChange}
            disabled={disabled}
            onBlur={onBlur}
          />
        );
      })}
    </div>
  );
}

CheckboxGroup.displayName = "CheckboxGroup";
CheckboxGroup.Item = DefaultCheckboxGroupItem;

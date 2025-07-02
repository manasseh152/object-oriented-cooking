/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { useEffect, useState } from "react";

import { Checkbox as PrimativeCheckbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import type { PrimativeFieldProps, PrimativeLabelType } from "../../lib/utils";

export type CheckboxProps = PrimativeFieldProps<boolean | null> & {
  label?: PrimativeLabelType;
  defaultChecked?: boolean; // Optional default checked state
};

export function Checkbox(props: CheckboxProps) {
  const { id, name, value, onChange, onBlur, label, disabled, defaultChecked = false } = props;

  const [checked, setChecked] = useState(value ?? defaultChecked);

  useEffect(() => {
    setChecked(!!value);
  }, [value]);

  function handleCheckedChange(checked: boolean) {
    onChange(checked);
  }

  return (
    <Label
      className="flex items-center space-x-2"
      disabled={disabled}
    >
      <PrimativeCheckbox
        id={id ?? `checkbox-${name}`}
        name={name}
        checked={checked}
        onCheckedChange={handleCheckedChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {label && <span className="text-sm">{label}</span>}
    </Label>
  );
}

Checkbox.displayName = "Checkbox";

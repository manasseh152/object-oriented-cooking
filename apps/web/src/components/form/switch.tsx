/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { HTMLAttributes } from "react";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch as PrimitiveSwitch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type { PrimativeFieldProps, PrimativeFormPropsOmit, PrimativeLabelType } from "../../lib/utils";

export type SwitchProps = Omit<HTMLAttributes<HTMLDivElement>, PrimativeFormPropsOmit> & PrimativeFieldProps<boolean | null> & {
  label?: PrimativeLabelType;
  disabled?: boolean;
};

export function Switch(props: SwitchProps) {
  const { name, value, onChange, onBlur, label, className, disabled, ...restProps } = props;

  const [checked, setChecked] = useState(value);
  const id = `switch-${name}`;

  useEffect(() => {
    setChecked(!!value);
  }, [value]);

  function handleCheckedChange(checked: boolean) {
    onChange(checked);
  }

  return (
    <div className={cn("flex items-center gap-2", className)} {...restProps}>
      <PrimitiveSwitch
        id={id}
        name={name}
        checked={checked ?? false}
        onCheckedChange={handleCheckedChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {label && <Label htmlFor={id} disabled={disabled}>{label}</Label>}
    </div>
  );
}

Switch.displayName = "Switch";

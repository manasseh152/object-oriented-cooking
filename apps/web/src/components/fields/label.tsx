import type { ReactNode } from "react";

import type { LabelAsDivProps, LabelAsLabelProps, LabelProps } from "@/components/ui/label";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { PrimativeLabelType } from "../../lib/utils";

import { ClearField } from "./clear-field";

export function LabelField(props: LabelAsDivProps & { asDiv: true }): ReactNode;
export function LabelField(props: LabelAsLabelProps & { asDiv?: false }): ReactNode;
export function LabelField(props: LabelProps): ReactNode {
  const { className, ...restProps } = props as LabelAsDivProps & LabelAsLabelProps;

  return <Label className={cn("flex flex-col gap-2", className)} {...restProps} />;
}

LabelField.displayName = "LabelField";

type LabelTitleProps = {
  label: PrimativeLabelType;
  isClearable?: boolean;
  required?: boolean;
  className?: string;
};

export function LabelTitle({ label, isClearable: cleable = false, required = false, className }: LabelTitleProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <span className="text-sm font-medium">
        {label}
        {required && <span>*</span>}
      </span>
      {cleable && <ClearField />}
    </div>
  );
}

LabelField.Title = LabelTitle;

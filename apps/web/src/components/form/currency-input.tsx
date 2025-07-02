/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { CurrencyInputProps as PrimativeCurrencyInputProps } from "react-currency-input-field";

import { useEffect, useState } from "react";
import PrimativeCurrencyInput from "react-currency-input-field";

import { Input } from "@/components/ui/input";

import type { PrimativeFieldProps } from "../../lib/utils";

export type CurrencyInputValueType = string | null | undefined;

export type CurrencyInputProps<TValue extends CurrencyInputValueType> = Omit<PrimativeCurrencyInputProps, "value" | "onChange" | "onValueChange"> & PrimativeFieldProps<TValue> & {
  locale?: string;
  allowNegative?: boolean;
  placeholder?: string;
  fixedDecimalLength?: number;
};

export function CurrencyInput<T extends CurrencyInputValueType>(
  props: CurrencyInputProps<T>,
) {
  const { fixedDecimalLength = 2, locale = "nl-NL", allowNegative = false, placeholder = "0,00", value, onChange, onBlur, id, disabled, ...restProps } = props;
  const [displayValue, setValue] = useState<string>("");

  useEffect(() => {
    if (value === null || value === undefined) {
      setValue("");
    }
    else {
      setValue(String(value));
    }
  }, [value]);

  const handleValueChange = (newValue: string | undefined) => {
    if (newValue === undefined || newValue === "") {
      onChange(null as T);
      return;
    }

    // Store as string with all formatting for display purposes
    // You can convert to number when using the value elsewhere if needed
    onChange(newValue as T);
  };

  return (
    <PrimativeCurrencyInput
      id={id}
      value={displayValue}
      onValueChange={handleValueChange}
      onBlur={onBlur}
      customInput={Input}
      fixedDecimalLength={fixedDecimalLength}
      groupSeparator={locale.startsWith("en") ? "," : "."}
      decimalSeparator={locale.startsWith("en") ? "." : ","}
      allowNegativeValue={allowNegative}
      placeholder={placeholder}
      disabled={disabled}
      {...restProps}
    />
  );
}

CurrencyInput.displayName = "CurrencyInput";

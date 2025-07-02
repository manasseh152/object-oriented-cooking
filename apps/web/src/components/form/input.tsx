/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { HTMLInputTypeAttribute, KeyboardEvent } from "react";

import { useCallback, useEffect, useState } from "react";

import type { InputProps as PrimativeInputProps } from "@/components/ui/input";

import { Input as PrimativeInput } from "@/components/ui/input";

import type { PrimativeFieldProps, PrimativeFormPropsOmit } from "../../lib/utils";

export type TextFieldValueType = string | number | null | undefined;

export type InputBaseProps<TValue extends TextFieldValueType> = Omit<PrimativeInputProps, PrimativeFormPropsOmit | "type"> & PrimativeFieldProps<TValue> & {
  autoFocus?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  mask?: string;
  maskChar?: string;
  type?: HTMLInputTypeAttribute | "text-number";
};

export type StandartInputProps = InputBaseProps<string> & {
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
};

export type NumberInputProps = InputBaseProps<number> & {
  type: "number";
};

export type TextNumberInputProps = InputBaseProps<number | null> & {
  type: "text-number";
};

export type InputProps = StandartInputProps | NumberInputProps | TextNumberInputProps;

export function Input<T extends TextFieldValueType>(
  props: InputBaseProps<T>,
) {
  const { value, onChange, mask, maskChar = "_", ...restProps } = props;
  const [displayValue, setDisplayValue] = useState<string>("");

  const finalType: HTMLInputTypeAttribute = props.type === "text-number" ? "text" : props.type || "text";

  function unmaskInput(value: string): string {
    if (!mask)
      return value;

    const dividers = Array.from(new Set(mask.split("").filter(c => c !== maskChar)));

    return value.split("").filter(char => !dividers.includes(char)).join("");
  }

  const formatValue = useCallback((rawValue: string): string => {
    if (!mask)
      return rawValue;

    let formatted = "";
    let rawIndex = 0;

    for (const maskCharItem of mask) {
      if (maskCharItem === maskChar && rawIndex < rawValue.length) {
        formatted += rawValue[rawIndex++];
      }
      else if (maskCharItem !== maskChar && rawIndex <= rawValue.length) {
        formatted += maskCharItem;
      }
    }

    return formatted;
  }, [mask, maskChar]);

  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }
    if (typeof value === "string" && mask) {
      setDisplayValue(formatValue(value));
    }
    else {
      setDisplayValue(String(value));
    }
  }, [value, mask, formatValue]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (mask && e.key === "Backspace" && finalType === "text") {
      const inputEl = e.currentTarget;
      const cursorPos = inputEl.selectionStart;
      if (cursorPos && cursorPos === inputEl.selectionEnd && cursorPos > 0) {
        e.preventDefault();

        let newCursorPos = cursorPos;
        while (newCursorPos > 0 && mask[newCursorPos - 1] !== maskChar) {
          newCursorPos--;
        }

        const rawValue = unmaskInput(displayValue);
        const deletionIndex
          = unmaskInput(displayValue.slice(0, newCursorPos)).length - 1;

        if (deletionIndex >= 0) {
          const updatedRawValue
            = rawValue.slice(0, deletionIndex)
              + rawValue.slice(deletionIndex + 1);
          onChange(updatedRawValue as T);
          const newDisplayValue = formatValue(updatedRawValue);
          setDisplayValue(newDisplayValue);
          setTimeout(
            () => inputEl.setSelectionRange(newCursorPos - 1, newCursorPos - 1),
            0,
          );
        }
      }
    }
    props.onKeyDown?.(e);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;

    if (mask && finalType === "text") {
      const raw = unmaskInput(typedValue);
      onChange(raw as T);
      setDisplayValue(formatValue(raw));
      return;
    }

    if (props.type === "number") {
      const numericValue = Number.parseFloat(typedValue);
      if (typedValue === "" || Number.isNaN(numericValue))
        return;
      onChange(numericValue as T);
      return;
    }

    if (props.type === "text-number") {
      const numericValue = Number.parseFloat(typedValue);
      onChange(
        (typedValue === "" || Number.isNaN(numericValue) ? null : numericValue) as T,
      );
      return;
    }

    onChange(typedValue as T);
  };

  return (
    <PrimativeInput
      {...restProps}
      type={finalType}
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}

    />
  );
}

Input.displayName = "Input";

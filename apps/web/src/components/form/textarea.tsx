/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { useEffect, useState } from "react";

import type { TextareaProps as PrimativeTextareaProps } from "@/components/ui/textarea";

import { Textarea as TextareaPrimitive } from "@/components/ui/textarea";

import type { PrimativeFieldProps, PrimativeFormPropsOmit } from "../../lib/utils";

export type TextareaProps = Omit<PrimativeTextareaProps, PrimativeFormPropsOmit> & PrimativeFieldProps<string | null> & {};

export function Textarea(props: TextareaProps) {
  const { name, value, onChange, onBlur, className, disabled, ...restProps } = props;

  const [textValue, setTextValue] = useState(value ?? "");
  const id = `textarea-${name}`;

  useEffect(() => {
    if (value === undefined || value === null) {
      setTextValue("");
    }
    else {
      setTextValue(value);
    }
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.target.value;

    if (newValue === "") {
      onChange(null);
    }
    else {
      onChange(newValue);
    }
  }

  return (
    <TextareaPrimitive
      id={id}
      name={name}
      value={textValue}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={disabled}
      {...restProps}
    />
  );
}

Textarea.displayName = "Textarea";

/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { useEffect, useState } from "react";

import type { InputProps } from "@/components/ui/input";

import { Input } from "@/components/ui/input";

import type { PrimativeFieldProps, PrimativeFormPropsOmit } from "../../lib/utils";

export type TimePickerValueType = number | string | null | undefined;

export type TimePickerProps<TValue extends TimePickerValueType> = Omit<InputProps, PrimativeFormPropsOmit> & PrimativeFieldProps<TValue> & {
  min?: TimePickerValueType;
  max?: TimePickerValueType;
  clearable?: boolean;
  as?: TValue extends number ? "seconds" : TValue extends string ? "iso" : "seconds";
};

/**
 * Convert a time value to seconds
 * - If the value is a number, it's assumed to already be in seconds
 * - If the value is a string in HH:MM format, it's converted to seconds
 * - If the value is null or undefined, returns 0
 */
function convertToSeconds(timeValue: TimePickerValueType): number {
  if (timeValue === null || timeValue === undefined)
    return 0;
  if (typeof timeValue === "number")
    return timeValue;

  // Handle HH:MM format
  try {
    const [hours, minutes] = timeValue.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      // TODO: Implement a logger
      // logger.warn('Invalid time format:', timeValue);
      return 0;
    }
    return hours * 3600 + minutes * 60;
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    // TODO: Implement a logger
    // logger.warn('Error parsing time:', timeValue, e);
    return 0;
  }
}

/**
 * Convert seconds to HH:MM format for the time input
 * @param seconds The number of seconds to convert
 * @returns A string in the format "HH:MM"
 */
function secondsToTimeFormat(seconds: number): string {
  // Ensure we have a valid number
  if (Number.isNaN(seconds) || seconds < 0) {
    // TODO: Implement a logger
    // logger.warn('Invalid seconds value:', seconds);
    return "00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/**
 * Check if a string is a valid HH:MM time format
 */
function isValidTimeFormat(value: string): boolean {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /^([01]?\d|2[0-3]):[0-5]\d$/.test(value);
}

export function TimePicker<TValue extends TimePickerValueType>(
  props: TimePickerProps<TValue>,
) {
  const {
    value,
    onChange,
    onBlur,
    id,
    disabled,
    className,
    min,
    max,
    clearable = true,
    as = (typeof value === "string"
      ? "iso"
      : "seconds") as TimePickerProps<TValue>["as"],
    ...restProps
  } = props;

  // Track the input display value
  const [displayValue, setDisplayValue] = useState<string>("");

  // Sync the display with the actual value
  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }

    // For string values (HH:MM format)
    if (typeof value === "string") {
      // If it's already a valid time string, use it directly
      if (isValidTimeFormat(value)) {
        setDisplayValue(value);
      }
      else {
        // TODO: Implement a logger
        // logger.warn('Invalid time string format:', value);
        setDisplayValue("00:00");
      }
    }
    else if (typeof value === "number") {
      // For number values, convert seconds to HH:MM for display
      setDisplayValue(secondsToTimeFormat(value));
    }
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    // Always update display value for responsive UI
    setDisplayValue(inputValue);

    // If input is cleared and clearable is true, set to null/undefined
    if (inputValue === "" && clearable) {
      // Preserve the original type (null or undefined)
      if (value === null) {
        (onChange as (value: null) => void)(null);
      }
      else if (value === undefined) {
        (onChange as (value: undefined) => void)(undefined);
      }
      else if (as === "iso" || typeof value === "string") {
        // For string values, default to empty string when clearing
        (onChange as (value: string) => void)("" as any);
      }
      else {
        // For number values, default to null when clearing
        (onChange as (value: null) => void)(null);
      }
      return;
    }

    if (isValidTimeFormat(inputValue)) {
      if (
        as === "iso"
        || typeof value === "string"
        || value === null
        || value === undefined
      ) {
        // String mode (HH:MM format) or null/undefined converted to string based on 'as' prop
        // Check min/max constraints
        const secondsValue = convertToSeconds(inputValue);
        const minSeconds
          = min !== undefined ? convertToSeconds(min) : undefined;
        const maxSeconds
          = max !== undefined ? convertToSeconds(max) : undefined;

        if (minSeconds !== undefined && secondsValue < minSeconds)
          return;
        if (maxSeconds !== undefined && secondsValue > maxSeconds)
          return;

        // Return the HH:MM string
        (onChange as (value: string) => void)(inputValue as any);
      }
      else {
        // Number mode (seconds)
        // Convert HH:MM to seconds
        const secondsValue = convertToSeconds(inputValue);

        // Check min/max constraints
        const minSeconds
          = min !== undefined ? convertToSeconds(min) : undefined;
        const maxSeconds
          = max !== undefined ? convertToSeconds(max) : undefined;

        if (minSeconds !== undefined && secondsValue < minSeconds)
          return;
        if (maxSeconds !== undefined && secondsValue > maxSeconds)
          return;

        // Return seconds
        (onChange as (value: number) => void)(secondsValue as any);
      }
    }
  };

  function handleBlur() {
    // If display is empty and clearable, keep it empty
    if (displayValue === "" && clearable) {
      if (value === null || value === undefined) {
        // Already cleared, do nothing
      }
      else {
        // Clear the value if not already cleared
        if (value === null) {
          (onChange as (value: null) => void)(null);
        }
        else if (value === undefined) {
          (onChange as (value: undefined) => void)(undefined);
        }
        else if (as === "iso" || typeof value === "string") {
          // For string values, default to empty string when clearing
          (onChange as (value: string) => void)("" as any);
        }
        else {
          // For number values, default to null when clearing
          (onChange as (value: null) => void)(null);
        }
      }
      onBlur?.();
      return;
    }

    // On blur, if the current input is invalid, reset to the last valid value
    if (!isValidTimeFormat(displayValue)) {
      if (value === null || value === undefined) {
        setDisplayValue("");
      }
      else if (typeof value === "number") {
        setDisplayValue(secondsToTimeFormat(value as number));
      }
      else if (
        typeof value === "string"
        && isValidTimeFormat(value as string)
      ) {
        setDisplayValue(value as string);
      }
      else {
        setDisplayValue("00:00");
      }
    }
    onBlur?.();
  };

  return (
    <Input
      id={id}
      type="time"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
      placeholder="HH:MM"
      {...restProps}
    />
  );
}

TimePicker.displayName = "TimePicker";

import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reportWebVitals(onPerfEntry?: () => void) {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}

export type PrimitiveValueType = string | number | boolean | null | Date | undefined;
export type PrimativeLabelType = string | string[] | ReactNode | ReactNode[];
export type PrimativeFieldProps<TValue> = {
  id?: string;
  name: string;
  value: TValue;
  onChange: (value: TValue) => void;
  onBlur?: () => void;
  disabled?: boolean;
};
export type PrimativeFormPropsOmit = keyof PrimativeFieldProps<PrimitiveValueType>;
export type PrimativeFieldPropsOmit = "name" | "value" | "onChange" | "onBlur";

/**
 * Markers used for special primitive value serialization
 */
export const VALUE_MARKER = {
  EMPTY: "__empty__",
  UNDEFINED: "__undefined__",
  NULL: "__null__",
  NAN: "__NaN__",
  INFINITY: "__Infinity__",
  NEGATIVE_INFINITY: "__-Infinity__",
  FALSE: "__false__",
  TRUE: "__true__",
  DATE_PREFIX: "__date__",
} as const;

/**
 * Converts a primitive value to a safe string representation
 *
 * @param value - Any primitive value to convert
 * @returns A string representation that preserves the value type
 */
export function valueToString(value: PrimitiveValueType): string {
  if (value === "")
    return VALUE_MARKER.EMPTY;
  if (value === undefined)
    return VALUE_MARKER.UNDEFINED;
  if (value === null)
    return VALUE_MARKER.NULL;
  if (typeof value === "number" && Number.isNaN(value))
    return VALUE_MARKER.NAN;
  if (value === Infinity)
    return VALUE_MARKER.INFINITY;
  if (value === -Infinity)
    return VALUE_MARKER.NEGATIVE_INFINITY;
  if (value === false)
    return VALUE_MARKER.FALSE;
  if (value === true)
    return VALUE_MARKER.TRUE;
  if (value instanceof Date)
    return `${VALUE_MARKER.DATE_PREFIX}${value.toISOString()}`;
  return String(value);
}

/**
 * Converts a string representation back to its original primitive value
 *
 * @param str - String representation of a primitive value
 * @returns The original primitive value
 */
export function stringToValue(str: string): PrimitiveValueType {
  if (str === VALUE_MARKER.EMPTY)
    return "";
  if (str === VALUE_MARKER.UNDEFINED)
    return undefined;
  if (str === VALUE_MARKER.NULL)
    return null;
  if (str === VALUE_MARKER.NAN)
    return Number.NaN;
  if (str === VALUE_MARKER.INFINITY)
    return Infinity;
  if (str === VALUE_MARKER.NEGATIVE_INFINITY)
    return -Infinity;
  if (str === VALUE_MARKER.FALSE)
    return false;
  if (str === VALUE_MARKER.TRUE)
    return true;
  if (str.startsWith(VALUE_MARKER.DATE_PREFIX)) {
    const dateStr = str.slice(VALUE_MARKER.DATE_PREFIX.length);
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Invalid date string: ${dateStr}`);
    }
    return date;
  }

  // Try to parse as number if it looks like one
  // eslint-disable-next-line regexp/no-unused-capturing-group
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return Number.parseFloat(str);
  }

  return str;
}

/**
 * Creates value conversion maps for a collection of values
 *
 * @param values - Array of primitive values to create conversion maps for
 * @returns Object containing maps for bidirectional conversion
 */
export function createValueMaps<TValue extends PrimitiveValueType>(values: TValue[]) {
  const valueToStringMap = new Map<TValue, string>();
  const stringToValueMap = new Map<string, TValue>();

  values.forEach((value) => {
    const strValue = valueToString(value);
    valueToStringMap.set(value, strValue);
    stringToValueMap.set(strValue, value);
  });

  return {
    valueToString: valueToStringMap,
    stringToValue: stringToValueMap,
  };
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;

  function debounce(...args: Parameters<T>) {
    if (timeoutId)
      clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };

  debounce.cancel = () => {
    if (timeoutId)
      clearTimeout(timeoutId);
  };

  return debounce as T & { cancel: () => void };
}

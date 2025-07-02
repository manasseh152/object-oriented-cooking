/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { ComponentPropsWithRef } from "react";

import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { CalendarProps } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import type { PrimativeFieldProps } from "../../lib/utils";

export type DatePickerValueType = Date | string | null;

export type DatePickerProps<T extends DatePickerValueType> = Omit<CalendarProps, "mode" | "selected" | "onSelect" | "disabled"> & PrimativeFieldProps<T> & {
  type?: "date-string" | "date";
};

/**
 * Converts a date to a string in ISO format (YYYY-MM-DD)
 * Uses local date values to prevent timezone issues
 */
function dateToString(date: Date): string {
  // Format as YYYY-MM-DD using local date parts to avoid timezone issues
  const year = date.getFullYear();
  // Month is 0-indexed in JavaScript Date, so add 1
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Converts a string in ISO format (YYYY-MM-DD) to a date
 * Creates the date at 12:00 noon to avoid timezone day-shifting issues
 */
function stringToDate(dateString: string): Date {
  // Parse YYYY-MM-DD and set time to noon to avoid timezone day-shifting issues
  const [year, month, day] = dateString.split("-").map(Number);

  // Create date with local noon time to avoid timezone shifting issues
  // Month is 0-indexed in JavaScript Date, so subtract 1 from the month
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function DatePicker<T extends DatePickerValueType>(props: DatePickerProps<T>) {
  const {
    name,
    value,
    onChange,
    onBlur,
    disabled,
    type = "date",
    ...restProps
  } = props;

  // Convert initial value to internal Date representation
  function getInitialDateValue() {
    if (value === null || value === undefined)
      return null;

    return typeof value === "string" ? stringToDate(value) : value as Date;
  };

  const [internalDate, setInternalDate] = useState<Date | null>(() => getInitialDateValue());

  // Handle incoming value changes
  useEffect(() => {
    if (value === null || value === undefined) {
      setInternalDate(null);
    }
    else if (typeof value === "string") {
      setInternalDate(stringToDate(value));
    }
    else {
      setInternalDate(value as Date);
    }
  }, [value]);

  // Handle date selection based on the type
  function handleDateSelect(selectedDate: Date | undefined) {
    if (!selectedDate)
      return;

    if (type === "date-string") {
      // Convert Date to string for date-string type
      onChange(dateToString(selectedDate) as T);
    }
    else {
      // Pass Date object directly for date type
      onChange(selectedDate as T);
    }

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <Calendar
      mode="single"
      selected={internalDate || undefined}
      onSelect={handleDateSelect}
      disabled={disabled}
      locale={nl}
      {...restProps}
    />
  );
}

DatePicker.displayName = "DatePicker";

export type DatePickerTriggerProps = Omit<ComponentPropsWithRef<typeof Button>, "children"> & {
  date?: DatePickerValueType;
};

export function DatePickerTrigger(props: DatePickerTriggerProps) {
  const { date, ...restProps } = props;

  const { t } = useTranslation("form-fields");

  const displayDate = useMemo(() => date
    ? format(date, "PPP", { locale: nl })
    : t("date-picker.placeholder"), [date, t]);

  return (
    <Button
      variant="input"
      {...restProps}
    >
      <CalendarIcon />
      <span className="w-full text-left">{displayDate}</span>
      <ChevronDown />
    </Button>
  );
}

DatePicker.Trigger = DatePickerTrigger;
DatePickerTrigger.displayName = "DatePickerTrigger";

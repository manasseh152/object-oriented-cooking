import type { ComponentPropsWithRef } from "react";

import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { DatePickerProps, DatePickerValueType } from "../form/date-picker";

import { useFieldContext } from "../../hooks/use-form-context";
import { DatePicker } from "../form/date-picker";

export type DatePickerFieldProps<T extends DatePickerValueType> = Omit<DatePickerProps<T>, PrimativeFieldPropsOmit> & {};

export function DatePickerField<T extends DatePickerValueType>(props: DatePickerFieldProps<T>) {
  const field = useFieldContext<T>();

  return (
    <DatePicker
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

export type DatePickerFieldTriggerProps = Omit<ComponentPropsWithRef<typeof Button>, "children"> & {};

export function DatePickerFieldTrigger(props: DatePickerFieldTriggerProps) {
  const field = useFieldContext<DatePickerValueType>();
  const { t } = useTranslation("form-fields");

  const displayDate = useMemo(() => field.state.value
    ? format(
        typeof field.state.value === "string"
          ? new Date(field.state.value)
          : field.state.value,
        "PPP",
        { locale: nl },
      )
    : t("date-picker.placeholder"), [field.state.value, t]);

  return (
    <Button
      variant="input"
      {...props}
    >
      <CalendarIcon />
      <span className="w-full text-left">{displayDate}</span>
      <ChevronDown />
    </Button>
  );
}

DatePickerField.Trigger = DatePickerFieldTrigger;
DatePickerFieldTrigger.displayName = "DatePickerFieldTrigger";

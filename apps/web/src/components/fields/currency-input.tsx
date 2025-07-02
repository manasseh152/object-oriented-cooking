import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { CurrencyInputProps, CurrencyInputValueType } from "../form/currency-input";

import { useFieldContext } from "../../hooks/use-form-context";
import { CurrencyInput } from "../form/currency-input";

export type CurrencyInputFieldProps<TValue extends CurrencyInputValueType> = Omit<CurrencyInputProps<TValue>, PrimativeFieldPropsOmit> & {};

export function CurrencyInputField<TValue extends CurrencyInputValueType>(props: CurrencyInputFieldProps<TValue>) {
  const field = useFieldContext<TValue>();

  return (
    <CurrencyInput
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

CurrencyInputField.displayName = "CurrencyInputField";

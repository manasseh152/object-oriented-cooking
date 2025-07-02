import type { PrimativeFieldPropsOmit } from "../../lib/utils";
import type { TextareaProps } from "../form/textarea";

import { useFieldContext } from "../../hooks/use-form-context";
import { Textarea } from "../form/textarea";

export type TextareaFieldProps = Omit<TextareaProps, PrimativeFieldPropsOmit> & {};

export function TextareaField(props: TextareaFieldProps) {
  const field = useFieldContext<string | null>();

  return (
    <Textarea
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
}

TextareaField.displayName = "TextareaField";

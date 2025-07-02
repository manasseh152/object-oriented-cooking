import { createContext, use } from "react";

import type { Option } from "@/lib/option";
import type { PrimitiveValueType } from "@/lib/utils";

export type OptionFieldContextState<TOption extends Option<PrimitiveValueType> = Option<PrimitiveValueType>> = {
  options: TOption[];
};

export const OptionFieldContext = createContext<OptionFieldContextState | null>(null);

export function useOptionField<TOption extends Option<PrimitiveValueType> = Option<PrimitiveValueType>>() {
  const context = use(OptionFieldContext);

  if (!context)
    throw new Error("useOptionField must be used within an OptionFieldContext");

  return context as OptionFieldContextState<TOption>;
}

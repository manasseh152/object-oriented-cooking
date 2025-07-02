/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { useEffect, useState } from "react";

import type { PopoverProps } from "@/components/ui/popover";

import { Popover } from "@/components/ui/popover";

import type { PrimitiveValueType } from "../../lib/utils";

import { useFieldContext } from "../../hooks/use-form-context";

export type PopoverFieldProps = Omit<PopoverProps, "onOpenChange" | "open"> & {
  closeOnChange?: boolean;
};

export function PopoverField(props: PopoverFieldProps) {
  const { closeOnChange = false, ...restProps } = props;

  const [open, setOpen] = useState(false);

  const field = useFieldContext<PrimitiveValueType>();

  useEffect(() => {
    if (field.state.value && closeOnChange) {
      setOpen(false);
    }
  }, [field.state.value, closeOnChange]);

  return <Popover open={open} onOpenChange={setOpen} {...restProps} />;
}

PopoverField.displayName = "PopoverField";

PopoverField.Content = Popover.Content;
PopoverField.Trigger = Popover.Trigger;
PopoverField.Anchor = Popover.Anchor;

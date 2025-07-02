import type { ComponentPropsWithRef } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useFieldContext } from "../../hooks/use-form-context";

export type ClearFieldProps = Omit<ComponentPropsWithRef<typeof Button>, "children"> & {
  onClear?: () => void;
};

export function ClearField(props: ClearFieldProps) {
  const { onClear, ...rest } = props;
  const field = useFieldContext();

  return (
    <Button
      variant="outline"
      onClick={() => {
        if (field.state.value === undefined || field.state.value === null)
          return;

        // TODO: Revisit this logic for clearing different types of fields
        // if (Array.isArray(field.state.value)) {
        //     field.handleChange([]);
        // }
        // else if (typeof field.state.value === 'object') {
        //     field.handleChange({});
        // }
        // else if (typeof field.state.value === 'string') {
        //     field.handleChange('');
        // }
        // else {
        //     field.handleChange(null);
        // }

        field.handleChange(null);

        field.handleBlur();
        onClear?.();
      }}
      {...rest}
      aria-label="Clear field"
      className="h-4 w-4 p-0 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-50"
    >
      <X size={12} />
    </Button>
  );
}

ClearField.displayName = "ClearField";

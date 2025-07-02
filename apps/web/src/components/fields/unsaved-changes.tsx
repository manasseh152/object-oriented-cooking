import { cn } from "@/lib/utils";

import { useFormContext } from "../../hooks/use-form-context";

export function UnsavedChangesIndicator(props: { className?: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={state => state.isDirty}
      children={isDirty =>
        isDirty
          ? (
              <span
                className={cn(
                  "inline-flex items-center justify-center text-sm font-medium text-amber-600",
                  props.className,
                )}
              >
                Unsaved Changes
              </span>
            )
          : null}
    />
  );
}

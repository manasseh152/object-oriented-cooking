import { Loader2 } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFormContext } from "../../hooks/use-form-context";

type SubmitButtonProps = {
  label?: string;
  children?: React.ReactNode;
  submittingLabel?: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

export function SubmitButton({
  label,
  children = "Submit",
  submittingLabel,
  className,
  asChild,
}: SubmitButtonProps) {
  const form = useFormContext();

  const defaultSubmittingLabel = (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting
    </>
  );

  return (
    <form.Subscribe
      selector={state => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => (
        <Button
          onClick={form.handleSubmit}
          disabled={isSubmitting || !canSubmit}
          className={cn(className)}
          asChild={asChild}
        >
          {isSubmitting
            ? submittingLabel || defaultSubmittingLabel
            : children || label}
        </Button>
      )}
    </form.Subscribe>
  );
}

import { cn } from "@/lib/utils";

import { useFieldContext } from "../../hooks/use-form-context";

export function ValidationError(props: {
  className?: string;
  maxToShow?: number | "all";
}) {
  const field = useFieldContext();
  const errors = field.state.meta.errors || [];

  // Determine how many errors to show
  const errorsToShow
    = props.maxToShow === "all" || !props.maxToShow
      ? errors
      : errors.slice(0, props.maxToShow);

  return (
    <div className={cn("text-xs text-red-500", props.className)}>
      {errorsToShow.length > 0
        ? errorsToShow.map((error) => {
            const message = typeof error === "string"
              ? error
              : error.message || JSON.stringify(error);
            return (
              <div key={message}>
                {message}
              </div>
            );
          })
        : null}
      {props.maxToShow !== "all"
        && props.maxToShow
        && errors.length > props.maxToShow && (
        <div>
          And
          {errors.length - props.maxToShow}
          {" "}
          more error(s)
        </div>
      )}
    </div>
  );
}

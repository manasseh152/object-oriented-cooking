import type { FormApi, FormState } from "@tanstack/form-core";
import type { NoInfer } from "@tanstack/react-store";

import { useEffect, useRef } from "react";

import { useFormContext } from "../../hooks/use-form-context";

export function ShowIf<
  TFormData = any,
  TSelected = any,
>({
  children,
  selector,
  when,
  onShow,
  onHide,
}: {
  children: React.ReactNode;
  selector: (state: NoInfer<FormState<TFormData>>) => TSelected;
  when: (state: TSelected) => boolean;
  form?: FormApi<TFormData>;
  onShow?: () => void;
  onHide?: () => void;
}) {
  const form = useFormContext();
  const prevShownRef = useRef<boolean | null>(null);

  return (
    <form.Subscribe
      // @ts-expect-error: This is a workaround for the type error. The selector prop is not typed correctly in the FormApi type definition.
      selector={selector}
    >
      {(value) => {
        const shouldShow = when(value);

        // Using useEffect inside the render function to handle the callbacks
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          // Only trigger callbacks after initial render and when state changes
          if (
            prevShownRef.current !== null
            && prevShownRef.current !== shouldShow
          ) {
            if (shouldShow && onShow) {
              onShow();
            }
            else if (!shouldShow && onHide) {
              onHide();
            }
          }
          prevShownRef.current = shouldShow;
        }, [shouldShow]);

        return shouldShow ? children : null;
      }}
    </form.Subscribe>
  );
}

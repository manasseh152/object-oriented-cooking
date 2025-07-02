// TESTING
import { Block } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

import { useFormContext } from "../../hooks/use-form-context";

export function Blocker() {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={state => ({
        isDirty: state.isDirty,
        isSubmitted: state.isSubmitted,
      })}
    >
      {({ isDirty }) => (
        <>
          <Block
            shouldBlockFn={() => isDirty}
            withResolver
            enableBeforeUnload={false}
          >
            {({ status, proceed, reset }) => (
              <>
                {status === "blocked" && (
                  <Dialog
                    open={status === "blocked"}
                    onOpenChange={() => reset()}
                  >
                    <Dialog.Content className="sm:max-w-[425px]">
                      <Dialog.Header>
                        <Dialog.Title>Unsaved Changes</Dialog.Title>
                      </Dialog.Header>
                      <div className="py-4">
                        <p>
                          Are you sure you want to leave? Your changes will be
                          lost.
                        </p>
                      </div>
                      <Dialog.Footer>
                        <Button variant="outline" onClick={reset}>
                          No, stay
                        </Button>
                        <Button onClick={proceed}>Yes, leave</Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog>
                )}
              </>
            )}
          </Block>
        </>
      )}
    </form.Subscribe>
  );
}

'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

export type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>;
function Collapsible({
  ...props
}: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export type CollapsibleTriggerProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>;
function CollapsibleTrigger({
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>;
function CollapsibleContent({
  ...props
}: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible };

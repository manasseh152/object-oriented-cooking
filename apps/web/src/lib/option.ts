import type { PrimativeLabelType, PrimitiveValueType } from "@/lib/utils";

import { createValueMaps } from "@/lib/utils";

export type Option<T extends PrimitiveValueType> = {
  label: PrimativeLabelType;
  value: T;
};

/**
 * Creates value conversion maps from option objects
 *
 * @param options - Array of option objects with value property
 * @returns Object containing maps for bidirectional conversion
 */
export function createValueMapsFromOptions<TValue extends PrimitiveValueType, TOption extends Option<TValue>>(
  options: TOption[],
) {
  return createValueMaps(options.map(option => option.value));
}

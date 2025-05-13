export type PrimitiveValueType = string | number | boolean | null | undefined;

/**
 * Constants for special value string markers
 */
export const ValueMarkers = {
  EMPTY: '__empty__',
  UNDEFINED: '__undefined__',
  NULL: '__null__',
  NAN: '__NaN__',
  INFINITY: '__Infinity__',
  NEGATIVE_INFINITY: '__-Infinity__',
  FALSE: '__false__',
  TRUE: '__true__',
} as const;

/**
 * Converts a primitive value to a safe string representation
 *
 * @param value - Any primitive value to convert
 * @returns A string representation that preserves the value type
 */
export function valueToString(value: PrimitiveValueType): string {
  if (value === '')
    return ValueMarkers.EMPTY;
  if (value === undefined)
    return ValueMarkers.UNDEFINED;
  if (value === null)
    return ValueMarkers.NULL;
  if (typeof value === 'number' && Number.isNaN(value))
    return ValueMarkers.NAN;
  if (value === Infinity)
    return ValueMarkers.INFINITY;
  if (value === -Infinity)
    return ValueMarkers.NEGATIVE_INFINITY;
  if (value === false)
    return ValueMarkers.FALSE;
  if (value === true)
    return ValueMarkers.TRUE;
  return String(value);
}

/**
 * Converts a string representation back to its original primitive value
 *
 * @param str - String representation of a primitive value
 * @returns The original primitive value
 */
export function stringToValue(str: string): PrimitiveValueType {
  if (str === ValueMarkers.EMPTY)
    return '';
  if (str === ValueMarkers.UNDEFINED)
    return undefined;
  if (str === ValueMarkers.NULL)
    return null;
  if (str === ValueMarkers.NAN)
    return Number.NaN;
  if (str === ValueMarkers.INFINITY)
    return Infinity;
  if (str === ValueMarkers.NEGATIVE_INFINITY)
    return -Infinity;
  if (str === ValueMarkers.FALSE)
    return false;
  if (str === ValueMarkers.TRUE)
    return true;

  // Try to parse as number if it looks like one
  // eslint-disable-next-line regexp/no-unused-capturing-group
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return Number.parseFloat(str);
  }

  return str;
}

/**
 * Creates value conversion maps for a collection of values
 *
 * @param values - Array of primitive values to create conversion maps for
 * @returns Object containing maps for bidirectional conversion
 */
export function createValueMaps<T extends PrimitiveValueType>(values: T[]) {
  const valueToStringMap = new Map<T, string>();
  const stringToValueMap = new Map<string, T>();

  values.forEach((value) => {
    const strValue = valueToString(value);
    valueToStringMap.set(value, strValue);
    stringToValueMap.set(strValue, value);
  });

  return {
    valueToString: valueToStringMap,
    stringToValue: stringToValueMap,
  };
}

/**
 * Creates value conversion maps from option objects
 *
 * @param options - Array of option objects with value property
 * @returns Object containing maps for bidirectional conversion
 */
export function createValueMapsFromOptions<T extends PrimitiveValueType>(
  options: Array<{ value: T } & Record<string, any>>,
) {
  return createValueMaps(options.map(option => option.value));
}

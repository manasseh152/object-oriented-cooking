import type {
  Dispatch,
  SetStateAction,
} from 'react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { logger } from '@/lib/logger';

// Helper function to safely parse JSON
function safeJsonParse<T>(jsonString: string | null): T | null {
  if (jsonString === null) {
    return null;
  }
  try {
    return JSON.parse(jsonString) as T;
  }
  catch (error) {
    logger.error('Error parsing JSON from localStorage:', error);
    return null; // Return null if parsing fails
  }
}

// Helper function to safely stringify JSON
function safeJsonStringify<T>(value: T): string | null {
  try {
    return JSON.stringify(value);
  }
  catch (error) {
    logger.error('Error stringifying value for localStorage:', error);
    return null; // Return null if stringify fails
  }
}

// Type definition for the hook's return value
type UseLocalStorageReturn<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  () => void,
];

/**
 * A React hook to manage state backed by localStorage.
 * It provides a useState-like interface and handles serialization,
 * deserialization, SSR safety, and cross-tab synchronization.
 *
 * @template T The type of the value to be stored.
 * @param {string} key The key under which to store the value in localStorage.
 * @param {T | (() => T)} initialValue The initial value to use if no value is found
 *   in localStorage, or a function that returns the initial value (lazy initialization).
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>, () => void]} A tuple containing:
 *   - The current state value.
 *   - A function to update the state value (similar to useState setter).
 *   - A function to remove the item from localStorage and reset the state.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): UseLocalStorageReturn<T> {
  // Helper function to get the initial value, resolving the function if needed
  const getInitialValue = useCallback((): T => {
    // eslint-disable-next-line unicorn/no-instanceof-builtins
    return initialValue instanceof Function ? initialValue() : initialValue;
  }, [initialValue]); // Depends only on initialValue itself

  // Function to read the value from localStorage safely
  const readValue = useCallback((): T => {
    // Prevent build errors and errors during server-side rendering
    if (typeof window === 'undefined' || !window.localStorage) {
      return getInitialValue();
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        // No item found, return initial value
        return getInitialValue();
      }
      const parsed = safeJsonParse<T>(item);
      // Use parsed value if valid, otherwise fallback to initial value
      return parsed !== null ? parsed : getInitialValue();
    }
    catch (error) {
      logger.error(`Error reading localStorage key “${key}”:`, error);
      // Fallback to initial value on error
      return getInitialValue();
    }
  }, [getInitialValue, key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (valueOrFn) => {
      // Prevent build errors and errors during server-side rendering
      if (typeof window === 'undefined' || !window.localStorage) {
        logger.warn(`Tried setting localStorage key “${key}” even though environment is not a browser.`);
        // Still update the state in memory for SSR/static export consistency
        setStoredValue(valueOrFn);
        return;
      }

      try {
        // Allow value to be a function so we have the same API as useState
        // eslint-disable-next-line unicorn/no-instanceof-builtins
        const newValue = valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;

        // Stringify the value safely
        const stringifiedValue = safeJsonStringify(newValue);

        if (stringifiedValue !== null) {
          // Save to local storage
          window.localStorage.setItem(key, stringifiedValue);

          // We dispatch a custom event so every useLocalStorage hook are notified
          // Note: The 'storage' event only triggers in other tabs/windows,
          // so we need this custom event for same-tab updates if multiple
          // hooks use the same key.
          window.dispatchEvent(
            new StorageEvent('storage', {
              key,
              newValue: stringifiedValue,
              storageArea: window.localStorage,
            }),
          );
        }
        else {
          // TODO: Use global error handling
          // Handle stringification error - perhaps remove the key? Or keep old value?
          // For now, we just log the error and don't update localStorage.
          logger.error(`Failed to stringify value for key "${key}". LocalStorage not updated.`);
        }

        // Save state
        setStoredValue(newValue);
      }
      catch (error) {
        // TODO: Use global error handling
        logger.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue], // Include storedValue in deps for the function updater case
  );

  // Function to remove the item from localStorage
  const removeValue = useCallback(() => {
    // Prevent build errors and errors during server-side rendering
    if (typeof window === 'undefined' || !window.localStorage) {
      logger.warn(`Tried removing localStorage key “${key}” even though environment is not a browser.`);
      // Reset state in memory anyway
      setStoredValue(getInitialValue());
      return;
    }

    try {
      window.localStorage.removeItem(key);
      // Reset state to initial value
      const resetTo = getInitialValue();
      setStoredValue(resetTo);

      // Dispatch event to notify other hooks/tabs
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: null, // Indicate removal
          storageArea: window.localStorage,
        }),
      );
    }
    catch (error) {
      logger.error(`Error removing localStorage key “${key}”:`, error);
    }
  }, [key, getInitialValue]);

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if the key matches and it's from localStorage
      if (event.key !== key || event.storageArea !== window.localStorage) {
        return;
      }

      try {
        if (event.newValue === null) {
          // Item was removed, reset to initial value
          setStoredValue(getInitialValue());
          return;
        }

        // Parse the new value
        const parsed = safeJsonParse<T>(event.newValue);

        // If parsing fails, fallback to initial value
        if (parsed === null) {
          setStoredValue(getInitialValue());
          return;
        }

        // Otherwise, update state with the new value
        setStoredValue(parsed);
      }
      catch (error) {
        logger.error(`Error handling storage event for key "${key}":`, error);
        // Fallback to initial value on error
        setStoredValue(getInitialValue());
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // Only re-run the effect if key or initialValue changes
  }, [key, initialValue, getInitialValue]);

  return [storedValue, setValue, removeValue];
}

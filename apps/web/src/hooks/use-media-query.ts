import { useEffect, useState } from "react";

export type MediaQueryChangeHandler = (event: MediaQueryListEvent) => void;

/**
 * Custom hook that listens for changes to a media query and returns whether the query matches.
 *
 * @param query - The media query string to evaluate.
 * @returns A boolean indicating whether the media query matches.
 *
 * @example
 * ```typescript
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  // Initialize the state with the initial value of the media query.
  const [value, setValue] = useState(false);

  // Listen for changes to the media query and update the state accordingly.
  useEffect(() => {
    const abortController = new AbortController();

    // Create a new media query list object.
    const mediaQueryMatch = window.matchMedia(query);

    // Add an event listener to the media query list object.
    mediaQueryMatch.addEventListener(
      "change",
      (event) => {
        setValue(event.matches);
      },
      { signal: abortController.signal },
    );

    // Set the initial value of the state to the current value of the media query
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setValue(mediaQueryMatch.matches);

    // Return a cleanup function to remove the event
    return () => {
      abortController.abort();
    };
  }, [query]);

  // Return the current value of the media query.
  return value;
}

import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
      return new Promise((resolve) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(async () => {
          const result = await func(...args);
          resolve(result);
        }, delay);
      });
    },
    [func, delay],
  );
  return debouncedFn;
}

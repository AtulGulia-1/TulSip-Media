export function debounce<A extends unknown[], R>(
  func: (...args: A) => R,
  wait: number,
  options?: { maxWait?: number; trailing?: boolean }
): ((...args: A) => void) & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime: number | null = null;
  let lastArgs: A | null = null;

  const maxWait = options?.maxWait;

  const debounced = (...args: A) => {
    const now = Date.now();
    lastArgs = args;

    if (lastCallTime === null) {
      lastCallTime = now;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    if (maxWait && now - lastCallTime >= maxWait) {
      lastCallTime = now;
      func(...lastArgs);
      lastArgs = null;
    } else {
      timeout = setTimeout(() => {
        lastCallTime = null;
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
      }, wait);
    }
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastCallTime = null;
    lastArgs = null;
  };

  return debounced;
}

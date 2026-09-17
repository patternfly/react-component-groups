import { useEffect, useRef } from 'react';

// Fires onImpression once per mounted instance, the first time the element
// is at least 50% visible. Mount-based counting inflates the denominator
// with never-seen renders, so this is IntersectionObserver-based rather
// than fired on mount.
export const useImpressionTracking = (
  onImpression: (() => void) | undefined,
  isEligible: boolean,
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (!isEligible || !onImpression || hasFiredRef.current) {
      return undefined;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFiredRef.current) {
            hasFiredRef.current = true;
            onImpression();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isEligible, onImpression]);

  return ref;
};

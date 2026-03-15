import { useState, useEffect } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used by Toolbar to activate glass-morphism background.
 */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return scrolled;
}

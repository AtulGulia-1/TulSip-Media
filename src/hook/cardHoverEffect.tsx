import { useCallback, useRef } from 'react';

const CardHoverEffect = () => {
  const rafIdRef = useRef<number | null>(null);

  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    if (!element) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      const rotateX = (xPercent - 0.5) * 25; // left right
      const rotateY = (yPercent - 0.5) * -25; // up down

      element.style.setProperty('--rotate-y', `${rotateX.toFixed(2)}deg`);
      element.style.setProperty('--rotate-x', `${rotateY.toFixed(2)}deg`);
      rafIdRef.current = null;
    });
  }, []);
};

export default CardHoverEffect;

import { useState, useEffect, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 1000,
  className = '',
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;

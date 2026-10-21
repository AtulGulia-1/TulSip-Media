import { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedHeading = ({ text, className = '', style }: AnimatedHeadingProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Small delay to ensure the DOM is ready and the animation triggers properly
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');
  const charDelay = 30; // 30ms per character
  const globalDelay = 200; // 200ms initial global delay
  const duration = 500; // 500ms duration per character

  let charCounter = 0;

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          {line.split('').map((char, charIndex) => {
            const delay = globalDelay + charCounter * charDelay;
            charCounter++;
            
            return (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="inline-block transition-all ease-out"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${delay}ms`,
                  // If it's a space, render a non-breaking space
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;

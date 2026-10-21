import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

const AnimatedLetter = ({ text, className = '' }: AnimatedLetterProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {chars.map((char, index) => {
        // Calculate the range for this specific character
        const start = index / totalChars;
        const end = start + (1 / totalChars);
        
        // We use a slightly expanded range to make the transition smoother
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, start - 0.1), Math.min(1, start + 0.05)],
          [0.2, 1]
        );

        return (
          <motion.span
            key={index}
            style={{ opacity }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </p>
  );
};

export default AnimatedLetter;

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const AnimatedChar = ({ char, index, totalChars, scrollYProgress }: CharProps) => {
  const start = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.1), Math.min(1, start + 0.05)],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

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
      {chars.map((char, index) => (
        <AnimatedChar
          key={index}
          char={char}
          index={index}
          totalChars={totalChars}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};

export default AnimatedLetter;

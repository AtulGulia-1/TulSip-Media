import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

const WordsPullUpMultiStyle = ({ segments, className = '' }: WordsPullUpMultiStyleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  // Flatten the segments into an array of words with their associated styles
  const wordsWithStyles: { word: string; styleClass: string }[] = [];
  segments.forEach((segment) => {
    const words = segment.text.split(' ');
    words.forEach((word) => {
      if (word.trim()) {
        wordsWithStyles.push({
          word,
          styleClass: segment.className || '',
        });
      }
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {wordsWithStyles.map((item, index) => (
        <div key={index} className="overflow-hidden inline-flex relative mr-[0.25em] last:mr-0 pb-[0.1em]">
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.08,
            }}
            className={`inline-block ${item.styleClass}`}
          >
            {item.word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export default WordsPullUpMultiStyle;

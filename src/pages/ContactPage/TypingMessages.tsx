import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const messages = ["Ready to scale?", "Yes, let's talk.", "TulSip Media."];

const TypingMessages = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: any;

    const handleTyping = () => {
      const currentMessage = messages[currentMessageIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
      } else {
        setCurrentText(currentMessage.slice(0, currentText.length + 1));
        if (currentText === currentMessage) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }

      const speed = isDeleting ? 50 : 100;
      timeout = setTimeout(handleTyping, speed);
    };

    timeout = setTimeout(handleTyping, 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentMessageIndex]);

  return (
    <div 
      className="absolute left-[48.5%] md:left-[47.5%] lg:left-[48.5%] -translate-x-1/2 bottom-[32%] z-30 w-[110px] sm:w-[130px] flex justify-start text-left"
      style={{ fontFamily: 'var(--font-nokia)' }}
    >
      <span className="text-deep-dark text-[10px] sm:text-[14px] leading-tight break-words min-h-[1.5em]">
        {currentText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-1.5 h-3 bg-deep-dark ml-1 align-middle"
        />
      </span>
    </div>
  );
};

export default TypingMessages;

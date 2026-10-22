import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: 'msg-0',
  text: "Hello! I'm the TulSip Media assistant. Ask me about custom website development, e-commerce storefronts, technical SEO, or how to start a project.",
  sender: 'bot',
  timestamp: new Date(),
};

const getBotResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('website') || lowerInput.includes('web') || lowerInput.includes('cost') || lowerInput.includes('price')) {
    return "We build custom business websites, e-commerce storefronts, landing pages, and web applications. Project scope and cost depend on page count, custom design, integrations, and content readiness. You can request a tailored quote on our Contact page.";
  }
  if (lowerInput.includes('seo')) {
    return "Our technical SEO work covers clean semantic HTML, crawlable site structure, page speed optimization, metadata, and structured data so search engines and users can understand your pages clearly.";
  }
  if (lowerInput.includes('intern') || lowerInput.includes('career') || lowerInput.includes('noc')) {
    return "Our internship programme is open to eligible Diploma/UG/PG students (18+) for a minimum of 3 months (first 3 months unpaid mentorship phase). Visit our Careers & NOC page for full programme terms.";
  }
  if (lowerInput.includes('social') || lowerInput.includes('ads') || lowerInput.includes('audit')) {
    return "Alongside website development, we support brands with conversion landing pages, creative production, and manual website/brand audits. Visit /audit or /contact to share your goals.";
  }
  return "We'd love to learn about your project. Please share your business goals via hello@tulsipmedia.com or on our Contact page, and we'll outline a clear next step.";
};

type RobotState = 'HIDDEN' | 'PEEKING' | 'HANGING' | 'STANDING' | 'WAVING';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [robotState, setRobotState] = useState<RobotState>('HIDDEN');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    let stateInterval: ReturnType<typeof setInterval>;

    const handleScroll = () => {
      if (isOpen) return;

      setRobotState('HIDDEN');
      clearInterval(stateInterval);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        startIdleSequence();
      }, 3000);
    };

    const startIdleSequence = () => {
      const states: RobotState[] = ['PEEKING', 'HANGING', 'STANDING', 'WAVING'];
      let lastState: RobotState = 'HIDDEN';

      const pickNextState = () => {
        let next: RobotState;
        do {
          next = states[Math.floor(Math.random() * states.length)];
        } while (next === lastState);
        lastState = next;
        setRobotState(next);
      };

      pickNextState();
      stateInterval = setInterval(pickNextState, 6000);
    };

    if (!isOpen) {
      scrollTimeout = setTimeout(() => {
        startIdleSequence();
      }, 3000);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearInterval(stateInterval);
    };
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: `msg-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const newBotMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        text: getBotResponse(newUserMsg.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Idle Animation Robots */}
      {!isOpen && (
        <AnimatePresence mode="wait">
          {robotState === 'PEEKING' && (
            <motion.div
              key="peeking"
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0, y: [-5, 5, -5] }}
              exit={{ opacity: 0, x: 150 }}
              transition={{
                x: { type: 'spring', damping: 20, stiffness: 100 },
                y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
              }}
              className="fixed bottom-20 -right-6 md:-right-8 w-48 h-48 md:w-64 md:h-64 cursor-pointer z-[90] pointer-events-auto will-change-transform"
              onClick={() => {
                setIsOpen(true);
                setRobotState('HIDDEN');
              }}
            >
              <img src="/img/peeking.webp" className="w-full h-full object-contain object-right drop-shadow-[0_4px_16px_rgba(189,160,126,0.3)]" alt="" />
            </motion.div>
          )}

          {robotState === 'HANGING' && (
            <motion.div
              key="hanging"
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0, rotate: [-4, 4, -4] }}
              exit={{ opacity: 0, y: -200 }}
              transition={{
                y: { type: 'spring', damping: 15, stiffness: 80 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
              }}
              style={{ originY: 0 }}
              className="fixed top-0 right-[5%] w-48 h-64 md:w-64 md:h-80 cursor-pointer z-[90] pointer-events-auto will-change-transform"
              onClick={() => {
                setIsOpen(true);
                setRobotState('HIDDEN');
              }}
            >
              <div className="absolute top-0 left-1/2 w-[2px] h-16 bg-gradient-to-b from-royal-beige/50 to-transparent -translate-x-1/2" />
              <img src="/img/hanging.webp" className="w-full h-full object-contain pt-12 drop-shadow-[0_4px_16px_rgba(189,160,126,0.25)]" alt="" />
            </motion.div>
          )}

          {robotState === 'STANDING' && (
            <motion.div
              key="standing"
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: -20, scaleY: [1, 1.02, 1] }}
              exit={{ opacity: 0, y: 150 }}
              transition={{
                y: { type: 'spring', damping: 20, stiffness: 100 },
                scaleY: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
              }}
              style={{ originY: 1 }}
              className="fixed bottom-0 right-10 w-48 h-56 md:w-64 md:h-72 cursor-pointer z-[90] pointer-events-auto will-change-transform"
              onClick={() => {
                setIsOpen(true);
                setRobotState('HIDDEN');
              }}
            >
              <img src="/img/standing.webp" className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(189,160,126,0.3)]" alt="" />
            </motion.div>
          )}

          {robotState === 'WAVING' && (
            <motion.div
              key="waving"
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: -20, rotate: [-2, 2, -2] }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{
                y: { type: 'spring', damping: 20, stiffness: 100 },
                rotate: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
              }}
              className="fixed bottom-0 right-10 w-48 h-56 md:w-64 md:h-72 cursor-pointer z-[90] pointer-events-auto will-change-transform"
              onClick={() => {
                setIsOpen(true);
                setRobotState('HIDDEN');
              }}
            >
              <img src="/img/hii.webp" className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(189,160,126,0.35)]" alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Main Chat Interface Container */}
      <div className="fixed bottom-6 right-0 z-[100] flex flex-col items-end pointer-events-none">
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, x: -24 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: -24 }}
              exit={{ opacity: 0, y: 20, scale: 0.95, x: -24 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-deep-dark rounded-2xl shadow-token-card flex flex-col overflow-hidden border border-royal-beige/30 pointer-events-auto font-sans"
              role="dialog"
              aria-label="TulSip Media Assistant Chat"
            >
              {/* Header */}
              <div className="bg-dark-brown text-light-beige p-4 flex justify-between items-center shrink-0 border-b border-royal-beige/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-deep-dark/60 flex items-center justify-center overflow-hidden border border-royal-beige/30">
                    <img
                      src="/img/peeking.webp"
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Bot size={24} className="text-royal-beige hidden" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide text-light-beige">TulSip Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-royal-beige animate-pulse glow-cta" />
                      <span className="text-[10px] text-royal-beige uppercase tracking-wider">Project Guide</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close assistant chat"
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-royal-beige/20 text-light-beige rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-deep-dark flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === 'user'
                          ? 'bg-royal-beige text-deep-dark font-medium rounded-br-none'
                          : 'bg-dark-brown text-light-beige rounded-bl-none shadow-sm border border-royal-beige/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-dark-brown rounded-2xl rounded-bl-none px-4 py-3.5 shadow-sm border border-royal-beige/20 flex gap-1.5 items-center">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-1.5 h-1.5 bg-royal-beige rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-royal-beige rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-royal-beige rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-3 bg-dark-brown border-t border-royal-beige/20 shrink-0">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    aria-label="Ask about website development or services"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about website development..."
                    className="w-full bg-deep-dark border border-royal-beige/30 text-light-beige placeholder:text-royal-beige/60 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-royal-beige/40 focus:border-royal-beige transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-1 w-10 h-10 flex items-center justify-center bg-royal-beige text-deep-dark rounded-full hover:bg-light-beige transition-colors disabled:opacity-50"
                  >
                    <Send size={16} className="ml-1" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Standard Widget Button */}
        <AnimatePresence>
          {!isOpen && robotState === 'HIDDEN' && (
            <motion.button
              type="button"
              aria-label="Open TulSip Media project assistant"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: -24 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 bg-dark-brown rounded-full shadow-token-card flex items-center justify-center pointer-events-auto group border-2 border-royal-beige/40 mr-[-24px] glow-cta"
              style={{ marginRight: '-24px' }}
            >
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/img/peeking.webp"
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <MessageSquare size={24} className="text-royal-beige hidden" />
              </div>

              {/* Notification Dot */}
              <span className="absolute top-0 right-0 w-3 h-3 bg-royal-beige rounded-full border-2 border-deep-dark animate-pulse" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatbotWidget;

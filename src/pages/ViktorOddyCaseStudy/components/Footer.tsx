import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-royal-beige/20 mt-12 gap-12 font-general">
      <div>
        <a href="/contact" className="inline-block bg-cta glow-cta text-deep-dark rounded-full px-7 py-3 font-semibold text-sm transition-all hover:scale-105">
          Discuss Your Project
        </a>
      </div>

      <div className="flex gap-16 md:gap-24 text-royal-beige text-sm">
        <ArrowUpRight className="text-light-beige hidden md:block w-8 h-8" />
        
        <div className="flex flex-col gap-4">
          <a href="/#features" className="hover:text-light-beige transition-colors">Services</a>
          <a href="/case-studies" className="hover:text-light-beige transition-colors">Work</a>
          <a href="/about" className="hover:text-light-beige transition-colors">About</a>
        </div>

        <div className="flex flex-col gap-4">
          <a href="https://x.com/TulSipMedia" target="_blank" rel="noreferrer" className="hover:text-light-beige transition-colors">X (Twitter)</a>
          <a href="https://github.com/AtulGulia-1" target="_blank" rel="noreferrer" className="hover:text-light-beige transition-colors">GitHub</a>
          <a href="/contact" className="hover:text-light-beige transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export const CopyrightBar = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 flex justify-between items-center text-xs text-royal-beige font-general">
      <span>© 2026 TulSip Media. All rights reserved.</span>
      <span>Local brands. Global Voices.</span>
    </div>
  );
};

export const BottomNav = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80]">
      <div className="bg-dark-brown/55 backdrop-blur-md border border-royal-beige/30 rounded-full px-2 py-2 flex items-center gap-6 shadow-2xl">
        <span className="font-zentry text-xl font-bold text-light-beige pl-4">TSM</span>
        <a href="/contact" className="bg-cta glow-cta text-deep-dark rounded-full px-6 py-2.5 font-semibold text-sm transition-transform hover:scale-105">
          Discuss Project
        </a>
      </div>
    </div>
  );
};

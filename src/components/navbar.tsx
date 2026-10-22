import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { debounce } from '../utils/debounce';
import { AlignJustify, X, ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DESIGN_TOKENS } from '../theme/tokens';

const navLinks = [
  { name: 'solutions', path: '/#solutions', className: '' },
  { name: 'case studies', path: '/case-studies', className: '' },
  { name: 'ads', path: '/ads', className: '' },
  { name: 'social', path: '/social', className: '' },
  { name: 'AI', path: '/ai-automation', className: '' },
  { name: 'careers & NOC', path: '/careers', className: '' },
  { name: 'about', path: '/about', className: '' },
  { name: 'contact', path: '/contact', className: '' },
];

const Navbar = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const posRef = useRef<number>(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorOffset, setCursorOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const changeNav = debounce(
    (preHeight: number, height: number) => {
      if (!navbarRef.current || isMobileMenuOpen) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 0.4 },
      });
      tl.to(navbarRef.current, {
        backgroundColor:
          height !== 0 ? DESIGN_TOKENS.palette.deepDark : 'transparent',
        boxShadow:
          height !== 0 ? DESIGN_TOKENS.shadow.card : 'none',
      }).to(
        navbarRef.current,
        {
          y: preHeight >= height ? 0 : -navbarRef.current.offsetHeight - 50,
        },
        '<',
      );
    },
    100,
    {
      trailing: true,
      maxWait: 400,
    },
  );

  const handleNavScroll = useCallback(
    () => changeNav(posRef.current, (posRef.current = window.scrollY)),
    [changeNav],
  );

  useGSAP(() => {
    window.addEventListener('scroll', handleNavScroll);
    return () => {
      window.removeEventListener('scroll', handleNavScroll);
    };
  }, [handleNavScroll]);

  // Close mobile menu on route or hash change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock background scroll, manage focus, and handle Escape/Tab when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (navbarRef.current) {
      gsap.set(navbarRef.current, { y: 0 });
    }

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      } else if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    toggleBtnRef.current?.focus();
  };

  const handleLinkPointerMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setCursorOffset({
      x: Math.max(-3, Math.min(3, relX * 3)),
      y: Math.max(-1.5, Math.min(1.5, relY * 1.5)),
    });
  };

  const handleAnchorClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('/#') && location.pathname === '/') {
      const targetId = path.slice(2);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const mobileOverlay =
    typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={mobileMenuRef}
            id="mobile-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            aria-hidden={!isMobileMenuOpen}
            className={`fixed inset-0 z-[200] flex min-h-[100dvh] w-full flex-col justify-between overflow-y-auto overflow-x-hidden bg-deep-dark px-6 py-5 transition-all duration-300 lg:hidden ${
              isMobileMenuOpen
                ? 'pointer-events-auto visible opacity-100'
                : 'pointer-events-none invisible opacity-0'
            }`}
          >
            {/* Mobile Overlay Top Bar */}
            <div className="flex w-full items-center justify-between border-b border-royal-beige/20 pb-4">
              <div className="flex items-center gap-3">
                <a
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="TulSip Media home"
                  className="rounded-full"
                >
                  <img
                    src="/Logo.png"
                    width={36}
                    height={36}
                    className="size-9 rounded-full drop-shadow-[0_0_12px_rgba(189,160,126,0.35)]"
                    alt="TulSip Media"
                  />
                </a>
                <span className="font-general text-xs font-bold uppercase tracking-[0.2em] text-light-beige">
                  TulSip Media
                </span>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="flex size-10 items-center justify-center rounded-full border border-royal-beige/40 bg-dark-brown/70 text-light-beige transition-colors hover:border-royal-beige hover:bg-royal-beige hover:text-deep-dark"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="my-auto flex flex-col items-center justify-center gap-4 py-6">
              {navLinks.map((link) => {
                const isActive =
                  link.path === location.pathname ||
                  (link.path === '/#solutions' &&
                    (location.hash === '#solutions' ||
                      location.hash === '#features' ||
                      location.hash === '#subscriptions'));
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => handleAnchorClick(link.path)}
                    className={`group flex items-center gap-2 rounded-full px-5 py-2 text-center font-general text-xl font-bold uppercase tracking-[0.18em] transition-all duration-200 active:scale-95 sm:text-2xl ${
                      isActive
                        ? 'bg-royal-beige/20 text-royal-beige'
                        : 'text-light-beige hover:text-royal-beige'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-royal-beige opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile Overlay Footer Actions */}
            <div className="flex flex-col gap-3 border-t border-royal-beige/20 pt-4">
              <div className="flex items-center justify-center gap-3">
                <a
                  href="/#solutions"
                  onClick={() => handleAnchorClick('/#solutions')}
                  className="flex-1 rounded-full bg-royal-beige py-3 text-center font-general text-xs font-bold uppercase tracking-wider text-deep-dark transition-transform active:scale-95"
                >
                  Solutions &amp; Services
                </a>
                <a
                  href="/audit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 rounded-full border border-royal-beige/45 bg-light-beige py-3 text-center font-general text-xs font-bold uppercase tracking-wider text-deep-dark transition-transform active:scale-95"
                >
                  Free Audit
                </a>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-royal-beige/80">
                <a
                  href="/policies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-light-beige"
                >
                  Policies &amp; Terms
                </a>
                <a
                  href="mailto:hello@tulsipmedia.com"
                  className="hover:text-light-beige"
                >
                  hello@tulsipmedia.com
                </a>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <nav
        id="navbar"
        ref={navbarRef}
        aria-label="Primary Navigation"
        className="fixed top-0 z-50 mx-3 mt-2 flex w-[calc(100%-1.5rem)] items-center justify-between rounded-lg border border-transparent px-8 py-3 text-[0.62rem] uppercase transition-colors duration-300 max-lg:px-4 max-md:px-2"
      >
        <div className="center h-12 gap-4 max-lg:h-8">
          <a
            href="/"
            aria-label="TulSip Media home"
            className="rounded-full transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/Logo.png"
              width={42}
              height={42}
              className="rounded-full drop-shadow-[0_0_12px_rgba(189,160,126,0.35)] max-lg:size-8"
              alt="TulSip Media"
            />
          </a>
          <a
            href="/#features"
            onClick={() => handleAnchorClick('/#features')}
            className="btn glow-cta relative h-8 w-28 overflow-hidden rounded-full bg-royal-beige font-semibold text-deep-dark max-lg:h-6 max-lg:w-20"
          >
            <span className="btn-text-one center text-deep-dark">Services</span>
            <span className="btn-text-two center text-deep-dark" aria-hidden="true">Services</span>
          </a>
          <a
            href="/audit"
            className="btn glow-cta relative h-8 w-28 overflow-hidden rounded-full border border-royal-beige/40 bg-light-beige font-semibold text-deep-dark max-lg:h-6 max-lg:w-20"
          >
            <span className="btn-text-one center text-deep-dark">audit</span>
            <span className="btn-text-two center text-deep-dark" aria-hidden="true">audit</span>
          </a>
        </div>

        {/* Desktop Cursor-Responsive Navigation */}
        <div
          id="navbar-links"
          className="center relative h-9 w-auto gap-1 rounded-full bg-deep-dark/45 px-2 backdrop-blur-md border border-royal-beige/15 text-light-beige max-lg:hidden"
          onMouseLeave={() => {
            setHoveredIndex(null);
            setCursorOffset({ x: 0, y: 0 });
          }}
        >
          {navLinks.map((link, index) => {
            const isHovered = hoveredIndex === index;
            const isActive =
              link.path === location.pathname ||
              (link.path === '/#solutions' &&
                (location.hash === '#solutions' ||
                  location.hash === '#features' ||
                  location.hash === '#subscriptions'));

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={() => handleAnchorClick(link.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={handleLinkPointerMove}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-wider transition-colors duration-200 ${link.className} ${
                  isHovered
                    ? 'text-deep-dark'
                    : isActive
                    ? 'text-royal-beige'
                    : 'text-light-beige'
                }`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="nav-pill"
                    className="-z-10 absolute inset-0 rounded-full bg-royal-beige shadow-[0_0_18px_rgba(189,160,126,0.45)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }}
                  />
                )}
                <span
                  style={{
                    transform: isHovered
                      ? `translate3d(${cursorOffset.x.toFixed(1)}px, ${cursorOffset.y.toFixed(1)}px, 0)`
                      : 'translate3d(0, 0, 0)',
                    transition: 'transform 150ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="inline-block"
                >
                  {link.name}
                </span>
                {isActive && !isHovered && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-royal-beige"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={openMobileMenu}
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-overlay"
          className="relative z-50 flex size-9 items-center justify-center rounded-full border border-royal-beige/30 bg-deep-dark/70 p-1.5 backdrop-blur-sm lg:hidden"
        >
          <AlignJustify
            size={18}
            className="cursor-pointer"
            color={DESIGN_TOKENS.palette.lightBeige}
          />
        </button>
      </nav>
      {mobileOverlay}
    </>
  );
};

export default Navbar;

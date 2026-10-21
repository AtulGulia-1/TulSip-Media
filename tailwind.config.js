/** @type {import('tailwindcss').Config} */
const OFFICIAL_PALETTE = {
  deepDark: '#1E1110',
  darkBrown: '#462C28',
  royalBeige: '#BDA07E',
  lightBeige: '#F1EADA',
};

const TULSIP_SCALE = {
  50: OFFICIAL_PALETTE.lightBeige,
  75: OFFICIAL_PALETTE.lightBeige,
  100: OFFICIAL_PALETTE.lightBeige,
  200: OFFICIAL_PALETTE.royalBeige,
  300: OFFICIAL_PALETTE.royalBeige,
  400: OFFICIAL_PALETTE.royalBeige,
  500: OFFICIAL_PALETTE.royalBeige,
  600: OFFICIAL_PALETTE.darkBrown,
  700: OFFICIAL_PALETTE.darkBrown,
  800: OFFICIAL_PALETTE.darkBrown,
  900: OFFICIAL_PALETTE.deepDark,
  950: OFFICIAL_PALETTE.deepDark,
  DEFAULT: OFFICIAL_PALETTE.royalBeige,
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        zentry: ['Clash Display', 'sans-serif'],
        general: ['Outfit', 'sans-serif'],
        'circular-web': ['Outfit', 'sans-serif'],
        'robert-medium': ['Outfit', 'sans-serif'],
        'robert-regular': ['Outfit', 'sans-serif'],
        'social-body': ['var(--font-body)'],
        'social-display': ['var(--font-display)'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        /* Official 4-Color Interface Palette */
        'deep-dark': OFFICIAL_PALETTE.deepDark,
        'dark-brown': OFFICIAL_PALETTE.darkBrown,
        'royal-beige': OFFICIAL_PALETTE.royalBeige,
        'light-beige': OFFICIAL_PALETTE.lightBeige,

        /* Semantic Interface Tokens */
        bg: 'var(--bg-primary)',
        surface: 'var(--bg-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        muted: 'var(--text-secondary)',
        stroke: 'var(--border-subtle)',
        accent: 'var(--accent-primary)',
        primary: OFFICIAL_PALETTE.lightBeige,
        cta: {
          DEFAULT: OFFICIAL_PALETTE.royalBeige,
          hover: OFFICIAL_PALETTE.lightBeige,
        },

        /* Enforce palette across base & legacy utility names (preventing bright-white, blue, purple, orange, etc.) */
        white: OFFICIAL_PALETTE.lightBeige,
        black: OFFICIAL_PALETTE.deepDark,
        gray: TULSIP_SCALE,
        neutral: TULSIP_SCALE,
        zinc: TULSIP_SCALE,
        slate: TULSIP_SCALE,
        stone: TULSIP_SCALE,
        blue: {
          50: OFFICIAL_PALETTE.lightBeige,
          75: OFFICIAL_PALETTE.lightBeige,
          100: OFFICIAL_PALETTE.lightBeige,
          200: OFFICIAL_PALETTE.deepDark,
          300: OFFICIAL_PALETTE.royalBeige,
          400: OFFICIAL_PALETTE.royalBeige,
          500: OFFICIAL_PALETTE.royalBeige,
          600: OFFICIAL_PALETTE.darkBrown,
          700: OFFICIAL_PALETTE.darkBrown,
          800: OFFICIAL_PALETTE.darkBrown,
          900: OFFICIAL_PALETTE.darkBrown,
          950: OFFICIAL_PALETTE.deepDark,
        },
        violet: {
          50: OFFICIAL_PALETTE.deepDark,
          300: OFFICIAL_PALETTE.darkBrown,
          DEFAULT: OFFICIAL_PALETTE.darkBrown,
        },
        purple: TULSIP_SCALE,
        indigo: TULSIP_SCALE,
        yellow: {
          100: OFFICIAL_PALETTE.darkBrown,
          300: OFFICIAL_PALETTE.royalBeige,
          400: OFFICIAL_PALETTE.royalBeige,
          500: OFFICIAL_PALETTE.royalBeige,
          DEFAULT: OFFICIAL_PALETTE.royalBeige,
        },
        amber: TULSIP_SCALE,
        orange: TULSIP_SCALE,
        red: TULSIP_SCALE,
        green: TULSIP_SCALE,
        emerald: TULSIP_SCALE,
        cyan: TULSIP_SCALE,
      },
      boxShadow: {
        'token-card':
          '0 12px 36px -8px rgba(18, 9, 8, 0.75), 0 0 1px 1px rgba(189, 160, 126, 0.18)',
        'token-glow': '0 0 24px 4px rgba(189, 160, 126, 0.35)',
        'token-ivory': '0 0 28px 6px rgba(241, 234, 218, 0.25)',
      },
      transitionTimingFunction: {
        token: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - 0.75rem))' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [],
};

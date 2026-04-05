import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F766E",
        secondary: "#115E59",
        accent: "#D97706",
        bgSoft: "#F8FAFC",
        ink: "#0F172A"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "ui-serif", "Georgia", "serif"]
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out both"
      },
      boxShadow: {
        soft: "0 12px 30px -14px rgba(15, 23, 42, 0.3)"
      }
    }
  },
  plugins: []
};

export default config;

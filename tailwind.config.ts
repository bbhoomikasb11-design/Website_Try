import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#0B0E14",      // Deep charcoal-indigo background
          card: "rgba(18, 22, 32, 0.65)", // Semi-transparent surface
          border: "rgba(217, 140, 74, 0.18)", // Subtle copper border
        },
        copper: {
          light: "#E8A85C",     // Warm amber highlight
          DEFAULT: "#D98C4A",   // Base copper accent
          dark: "#B36A2A",      // Deep copper
          glow: "rgba(217, 140, 74, 0.35)",
        },
        offwhite: {
          DEFAULT: "#F4F1EA",   // Soft off-white for headlines
          muted: "#94A3B8",     // Soft warm slate for secondary copy
          subtle: "#64748B",    // Dim metadata / borders
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070b18",
          900: "#0d1225",
          800: "#111827",
          700: "#1a2235",
          600: "#1e293b",
        },
        accent: {
          green:  "#00e676",
          purple: "#7c3aed",
          yellow: "#fbbf24",
          red:    "#ef4444",
          blue:   "#3b82f6",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(0,0,0,0.45)",
        glow: "0 0 16px rgba(0,230,118,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

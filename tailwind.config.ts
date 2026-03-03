import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "yonsei-blue": "#003876",
        "yonsei-dark": "#002650",
        accent: "#0086c4",
        "accent-light": "#e6f4fb",
        surface: "#f8fafc",
        "surface-elevated": "#ffffff",
        border: "#e2e8f0",
        "text-primary": "#0f172a",
        "text-secondary": "#475569",
        "text-muted": "#94a3b8",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
        heading: ["Inter", "Pretendard Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

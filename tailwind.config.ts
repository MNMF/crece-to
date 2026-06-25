import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#7C9473",
          dark: "#5F7556",
          light: "#A3B89B",
        },
        terracotta: {
          DEFAULT: "#D98C6B",
          dark: "#C26F4C",
        },
        cream: "#FAF6F0",
        sand: "#F0E8DC",
        ink: "#3D3530",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        organic: "2rem 1rem 2rem 1rem",
      },
    },
  },
  plugins: [],
};
export default config;

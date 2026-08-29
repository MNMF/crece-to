import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: "#7A8C5A", dark: "#5C6B42", light: "#A3B47E" },
        amber: { DEFAULT: "#D4922A", dark: "#B87820", light: "#E8B45A" },
        cream: "#FAF5EF",
        sand: "#F2EBE0",
        ink: "#6B3A1F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: { organic: "2rem 1rem 2rem 1rem" },
    },
  },
  plugins: [],
};
export default config;

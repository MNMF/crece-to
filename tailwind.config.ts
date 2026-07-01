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
          DEFAULT: "#6B7C5A",
          dark: "#4F5E41",
          light: "#8FA07A",
        },
        amber: {
          DEFAULT: "#C8872A",
          dark: "#A36A18",
          light: "#E0A84E",
        },
        cream: "#F8F2E8",
        sand: "#F0E6D2",
        ink: "#5C3D1E",
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

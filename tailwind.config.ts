import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        "8": "repeat(8, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
        "32": "repeat(32, minmax(0, 1fr))",
        "64": "repeat(64, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;

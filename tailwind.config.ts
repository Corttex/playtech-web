import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        playtech: {
          gold: "#D4AF37",
          dark: "#0A0A0E",
          card: "#12131A",
          accent: "#10B981"
        }
      },
    },
  },
  plugins: [],
};
export default config;

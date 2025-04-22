// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Make Geist the default sans font
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        // Keep abc-favorit as a separate utility class
        'abc-favorit': ['var(--font-abc-favorit)', 'system-ui', 'sans-serif'],
        // Add the new ABC Diatype font
        'abc-diatype': ['var(--font-abc-diatype)', 'system-ui', 'sans-serif'],
        // Remove the original 'geist' key if you only want it as the default 'sans'
        // 'geist': ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
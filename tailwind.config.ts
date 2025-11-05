
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  safelist: [
    { pattern: /(bg|text|border)-(sky|amber|violet|emerald|pink|yellow)-(400|500|600)/ },
  ],
  plugins: [],
};
export default config;

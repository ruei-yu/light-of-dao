/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  // 可保留，也可刪掉這段；JS 版不會有型別問題
  safelist: [
    { pattern: /(bg|text|border)-(sky|amber|violet|emerald|pink|yellow)-(400|500|600)/ },
  ],
  plugins: [],
};

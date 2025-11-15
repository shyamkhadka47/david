/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "#ffffff",
      museum:{
        gold:"#eeb32b",
        dark:"#000000",
        brown:"#6b5947",
      },
      foreground: "var(--foreground)",
    },
  },
};
export const plugins = [];

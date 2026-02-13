/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      BeVietnam: ['"Be Vietnam Pro"', ...defaultTheme.fontFamily.sans], // Add fallbacks
    },
  },

};
export const plugins = [];
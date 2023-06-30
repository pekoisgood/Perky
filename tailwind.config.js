/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        custom: "3% 1% 36% 1% / 2% 21% 4% 17%",
      },
      borderWidth: {
        custom: "2px 3px 2px 6px",
        tag: "2px 2px 2px 7px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

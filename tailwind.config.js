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
      keyframes: {
        boucing: {
          "from, to ": { transform: "scale(1, 1)" },
          "25%": { transform: "scale(0.9, 1.1)" },
          "50%": { transform: "scale(1.1, 0.9)" },
          "75%": { transform: "scale(0.95, 1.05)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "loaing-skeleton": {
          from: { "background-color": "hsl(200, 20%, 80%)" },
          to: { "background-color": "hsl(200, 20%, 95%)" },
        },
        blinking: {
          "from, to": { width: "100%", "border-right-color": "transparent" },
          "50%": { width: "0%", "border-right-color": "black" },
        },
        typing: {
          "from,to": { width: "0" },
          "0%, 20%, 40%, 60%, 80%, 100%": {
            "border-right-color": "transparent",
          },
          "10%, 30%, 50%, 70%,90% ": {
            "border-right-color": "black",
          },
          "15%, 85%": { width: "0" },
          "35%, 65%": { width: "100%" },
          "50%": { width: "100% " },
        },
      },
      animation: {
        wiggle: "wiggle 2s infinite",
        skeleton: "loading-skeleton 1s linear infinite",
        typing: "typing 9s steps(5, end) infinite",
        blink: "blinking 1s step-end infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

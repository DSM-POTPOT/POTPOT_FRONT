import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#2EC600",
        gray: "#9B9B9B",
        lightGray: "#F4F4F4",
        lime: "#3BEE04",
      },
    },
  },
  plugins: [],
};
export default config;

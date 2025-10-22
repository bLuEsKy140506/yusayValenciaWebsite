/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        primary: '#047857', // green shade
      },
    },
  },
  plugins: [],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // optional
  },
  future: {
    disableColorOpacityUtilitiesByDefault: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  // 👇 Force legacy color format instead of oklch
  safelist: [],
  


}

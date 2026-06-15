/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Roboto",
          "Ubuntu",
          "sans-serif",
        ],
      },
      colors: {
        atelier: {
          gold: "#c9a227",
          cream: "#e8e2d9",
          ink: "#0c0c0f",
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        glow: "0 0 0 1px rgba(201,162,39,0.45), 0 12px 40px rgba(201,162,39,0.1)",
        "inner-soft": "inset 0 1px 0 rgba(255,255,255,0.06)",
        panel: "4px 0 32px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};

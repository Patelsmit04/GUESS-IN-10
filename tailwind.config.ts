import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7357FF",
          "purple-light": "#EDE9FE",
          "purple-dark": "#5B3EE4",
          blue: "#38BDF8",
          "blue-light": "#E0F2FE",
          coral: "#FF6B6B",
          "coral-light": "#FFE4E6",
          yellow: "#FFD166",
          "yellow-light": "#FEF3C7",
          success: "#22C55E",
          "success-light": "#DCFCE7",
          error: "#F87171",
          bg: "#F7F6FF",
          surface: "#FFFFFF",
          text: "#202033",
          "text-muted": "#77778A",
          border: "#E2E0F5",
        },
      },
      borderRadius: {
        control: "10px",
        card: "18px",
        "card-lg": "24px",
        modal: "24px",
      },
      boxShadow: {
        tactile: "0 6px 0 0 rgba(115, 87, 255, 0.2)",
        "tactile-press": "0 2px 0 0 rgba(115, 87, 255, 0.2)",
        card: "0 10px 25px -5px rgba(32, 32, 51, 0.08), 0 8px 10px -6px rgba(32, 32, 51, 0.04)",
        "card-hover": "0 20px 30px -10px rgba(115, 87, 255, 0.18), 0 10px 15px -3px rgba(32, 32, 51, 0.06)",
        float: "0 25px 50px -12px rgba(115, 87, 255, 0.25)",
      },
      animation: {
        "bounce-subtle": "bounce-subtle 2s infinite ease-in-out",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 12px rgba(115, 87, 255, 0.4))" },
          "50%": { opacity: "0.85", filter: "drop-shadow(0 0 4px rgba(115, 87, 255, 0.2))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


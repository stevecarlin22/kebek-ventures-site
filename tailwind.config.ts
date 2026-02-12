import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F14",
        fog: "#F6F7F9",
        pine: "#0F3D2E",
        cedar: "#1C6E4D",
        ember: "#D65A31",
        bay: "#1E5FA8",
      },
      boxShadow: {
        soft: "0 12px 36px rgba(11,15,20,0.10)",
        lift: "0 18px 60px rgba(11,15,20,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;

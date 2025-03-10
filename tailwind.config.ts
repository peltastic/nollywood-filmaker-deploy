import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        sm: "480px",
        mid: "650px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        chatbp1: "1100px",
        chatbp: "1300px",
        chatbp2: "1400px",
        xxl: "1680px",
      },
      colors: {
        "border-gray": "#E5E9EB",
        "black-1": "#252C32",
        "black-2": "#333333",
        "black-3": "#181818",
        "black-4": "#101828",
        "black-5": "#111B2B",
        "black-6": "#171718",
        "black-7": "#171717",
        "black-8": "#18181B",
        "black-9": "#4F4E53",
        "gray-1": "#667085",
        "gray-2": "#D0D5DD",
        "gray-3": "#344054",
        "gray-4": "#5A657C",
        "gray-5": "#5B6871",
        "gray-6": "#414D63",
        "gray-7": "#A1A1AA",
        "gray-8": "#71717A",
        "gray-bg-1": "#F9FAFB",
        "gray-bg-2": "#F8F9FC",
        "gray-bg-3": "#EFF0F6",
        "gray-bg-4": "#F7F9FA",
        "gray-bg-5": "#FCFCFD",
        "gray-bg-6": "#EDF2F7",
        "gray-bg-7": "#F4F4F5",
        "gray-bg-8": "#FAFAFA",
        "gray-bg-9": "#EBEBEB",
        "stroke-1": "#DDE2E4",
        "stroke-2": "#CFD9E0",
        "stroke-3": "#B6C2E2",
        "stroke-4": "#F3F3F3",
        "stroke-5": "#EAECF0",
        "stroke-6": "#DADADA",
        "stroke-7": "#E2E8F0",
        "stroke-8": "#00000014",
        "stroke-9": "#D4D4D8",
        "stroke-10": "#E4E4E7",
        "stroke-11": "#F5F6F7",
        "stroke-12": "#E6E6E6",
        "yellow-1": "#FDE047",
        "stepper-green": "#027A48",
        "red-1": "#D92D20",
        "schedule-bg": "#1818180D",
        "green-1": "#DCFCE7",
        "profile-menu-border": "#F2F4F7",
        "calender-bg": "#F9F9F9",
        "admin-chat-bg": "#F1F1F1",
        "unchecked-gray": "#ACACAC",
        "blue-1": "#2c51c9",
        "light-awaiting":"#fff6ec",
        "dark-awaiting": "#a7671f",
        "input-text-color": "#414D63",
        "light-blue": "#E7F0FF",
        "dark-blue": "#225CB9",
        "light-yellow": "#FFF8D2",
        "dark-yellow": "#DD9C3A",
        "light-green": "#ECFDF3",
        "dark-green": "#027A48",
        "light-red": "#FFF2F2",
        "dark-red": "#BD002A",
        "border-red": "#FFB1B2",
        "positive-green": "#22C55E",
        "negative-red": "#EF4444",
        "val-error-red": "#eb4040",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

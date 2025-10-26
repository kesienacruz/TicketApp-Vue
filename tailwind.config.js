/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#2563eb",
          600: "#1e4fd1",
          700: "#193fa8"
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f9fafb",
          border: "#e5e7eb"
        },
        text: {
          DEFAULT: "#111827",
          dim: "#6b7280",
          inverse: "#ffffff"
        },
        danger: {
          bg: "#fee2e2",
          text: "#b91c1c",
          border: "#fecaca"
        }
      },
      borderRadius: {
        card: "1rem",
        pill: "9999px"
      },
      boxShadow: {
        card: "0 10px 24px -4px rgb(0 0 0 / 0.06)"
      },
      maxWidth: {
        screen1440: "1440px"
      },
      spacing: {
        header: "3.5rem",
        gutter: "1rem",
        "gutter-lg": "2rem"
      },
      fontSize: {
        "display-xl": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        "display-lg": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "display-md": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "display-sm": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "title-sm": ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "body-md": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
        "body-xs": ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }]
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("focus-visible", "&:focus-visible");
    },
  ],
}

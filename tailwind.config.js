/** @type {import('tailwindcss').Config} */
const rgb = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: rgb("bg"),
        bg: rgb("bg"),
        surface: rgb("surface"),
        text: rgb("text"),
        muted: rgb("muted"),
        accent: rgb("accent"),
        border: "var(--border)",
        violet: rgb("violet"),
        orange: rgb("orange"),
        pink: rgb("pink"),
        teal: rgb("teal"),
        // Arena-only.
        sky: rgb("sky"),
        green: rgb("green")
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      borderColor: {
        DEFAULT: "var(--border)"
      },
      maxWidth: {
        prose: "65ch"
      }
    }
  },
  plugins: []
};

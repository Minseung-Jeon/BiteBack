/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--c-primary)",
        neutral: {
          one: "var(--c-neutral-one)",
          two: "var(--c-neutral-two)",
          three: "var(--c-neutral-three)",
          four: "var(--c-neutral-four)",
        },
        accent: "var(--c-accent)"
      }
    },
  },
  plugins: [],
}


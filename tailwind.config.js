/** @type {import('tailwindcss').Config} */

function withOpacityValue(cssVariable) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVariable}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVariable}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVariable}))`;
  };
}

export default {
  darkMode: "class",
  content: [
    "./assets/**/*.{vue,js,ts,css}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: withOpacityValue("--color-primary-1"),
          2: withOpacityValue("--color-primary-2"),
          3: withOpacityValue("--color-primary-3"),
          4: withOpacityValue("--color-primary-4"),
          5: withOpacityValue("--color-primary-5"),
          6: withOpacityValue("--color-primary-6"),
          7: withOpacityValue("--color-primary-7"),
          8: withOpacityValue("--color-primary-8"),
          9: withOpacityValue("--color-primary-9"),
          10: withOpacityValue("--color-primary-10"),
          11: withOpacityValue("--color-primary-11"),
          12: withOpacityValue("--color-primary-12"),
          a1: withOpacityValue("--color-primary-a1"),
          a2: withOpacityValue("--color-primary-a2"),
          a3: withOpacityValue("--color-primary-a3"),
          a4: withOpacityValue("--color-primary-a4"),
          a5: withOpacityValue("--color-primary-a5"),
          a6: withOpacityValue("--color-primary-a6"),
          a7: withOpacityValue("--color-primary-a7"),
          a8: withOpacityValue("--color-primary-a8"),
          a9: withOpacityValue("--color-primary-a9"),
          a10: withOpacityValue("--color-primary-a10"),
          a11: withOpacityValue("--color-primary-a11"),
          a12: withOpacityValue("--color-primary-a12"),
          contrast: withOpacityValue("--color-primary-contrast"),
          surface: withOpacityValue("--color-primary-surface"),
          indicator: withOpacityValue("--color-primary-indicator"),
          track: withOpacityValue("--color-primary-track"),
        },
        gray: {
          1: withOpacityValue("--color-gray-1"),
          2: withOpacityValue("--color-gray-2"),
          3: withOpacityValue("--color-gray-3"),
          4: withOpacityValue("--color-gray-4"),
          5: withOpacityValue("--color-gray-5"),
          6: withOpacityValue("--color-gray-6"),
          7: withOpacityValue("--color-gray-7"),
          8: withOpacityValue("--color-gray-8"),
          9: withOpacityValue("--color-gray-9"),
          10: withOpacityValue("--color-gray-10"),
          11: withOpacityValue("--color-gray-11"),
          12: withOpacityValue("--color-gray-12"),
          a1: withOpacityValue("--color-gray-a1"),
          a2: withOpacityValue("--color-gray-a2"),
          a3: withOpacityValue("--color-gray-a3"),
          a4: withOpacityValue("--color-gray-a4"),
          a5: withOpacityValue("--color-gray-a5"),
          a6: withOpacityValue("--color-gray-a6"),
          a7: withOpacityValue("--color-gray-a7"),
          a8: withOpacityValue("--color-gray-a8"),
          a9: withOpacityValue("--color-gray-a9"),
          a10: withOpacityValue("--color-gray-a10"),
          a11: withOpacityValue("--color-gray-a11"),
          a12: withOpacityValue("--color-gray-a12"),
          contrast: withOpacityValue("--color-gray-contrast"),
          surface: withOpacityValue("--color-gray-surface"),
          indicator: withOpacityValue("--color-gray-indicator"),
          track: withOpacityValue("--color-gray-track"),
        },
        foreground: {
          DEFAULT: withOpacityValue("--color-foreground"),
        },
        black: {
          primary: "#151515",
          DEFAULT: "#000000",
        },
        white: {
          primary: "#EEF7FF",
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        nunito: [
          "Nunito",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
        montserrat: [
          "Montserrat",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
        openSans: [
          "Open Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
        poppins: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

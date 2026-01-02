import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,

  include: [
    "./src/**/*.{js,jsx,ts,tsx,astro}",
    "./pages/**/*.{js,jsx,ts,tsx,astro}",
  ],

  exclude: [],

  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },

  theme: {
    extend: {
      tokens: {
        fonts: {
          body: { value: '"Atkinson", sans-serif' },
        },
      },
      semanticTokens: {
        colors: {
          accent: {
            value: { base: "#2337ff", _dark: "#6b7fff" },
          },
          accentDark: {
            value: { base: "#000d8a", _dark: "#4a5bff" },
          },
          text: {
            value: { base: "#222839", _dark: "#d2d7e1" },
          },
          textHeading: {
            value: { base: "#0f1219", _dark: "#e5e9f0" },
          },
          textMuted: {
            value: { base: "#60739f", _dark: "#9faac8" },
          },
          bg: {
            value: { base: "#fff", _dark: "#1a1a2e" },
          },
          bgHeader: {
            value: { base: "#fff", _dark: "#16162a" },
          },
          bgCode: {
            value: { base: "#e5e9f0", _dark: "#282c37" },
          },
          border: {
            value: { base: "#e5e9f0", _dark: "#282c37" },
          },
        },
      },
    },
  },

  globalCss: {
    html: {
      fontFamily: "body",
      fontSize: "20px",
      lineHeight: "1.7",
      color: "text",
      bg: "bg",
    },
    body: {
      margin: 0,
      padding: 0,
      wordWrap: "break-word",
      overflowWrap: "break-word",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    "h1, h2, h3, h4, h5, h6": {
      margin: "0 0 0.5rem 0",
      color: "textHeading",
      lineHeight: "1.2",
    },
    h1: { fontSize: "3.052em" },
    h2: { fontSize: "2.441em" },
    h3: { fontSize: "1.953em" },
    h4: { fontSize: "1.563em" },
    h5: { fontSize: "1.25em" },
    a: { color: "accent" },
    "a:hover": { color: "accent" },
    p: { marginBottom: "1em" },
    ".prose p": { marginBottom: "2em" },
    code: {
      padding: "2px 5px",
      bg: "bgCode",
      borderRadius: "2px",
    },
    pre: {
      padding: "1.5em",
      borderRadius: "8px",
    },
    "pre > code": { all: "unset" },
    blockquote: {
      borderLeft: "4px solid token(colors.accent)",
      padding: "0 0 0 20px",
      margin: 0,
      fontSize: "1.333em",
    },
    hr: {
      border: "none",
      borderTop: "1px solid token(colors.border)",
    },
    img: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
    },
  },

  outdir: "styled-system",
});

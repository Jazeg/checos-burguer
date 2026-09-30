/* Config de Tailwind para compilar css/tailwind.css.
   Regenerar tras tocar clases en index.html o js/:
     npx tailwindcss@3 -c tailwind.config.js -i css/tailwind-input.css -o css/tailwind.css --minify
   Los mismos colores y tipografías viven en :root de css/styles.css. */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        ember: "var(--ember)",
        mustard: "var(--mustard)",
        muted: "var(--muted)"
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', "sans-serif"],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Sans"', 'system-ui', 'sans-serif']
      }
    }
  }
};

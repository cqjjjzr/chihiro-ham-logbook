/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts}', 'index.html', 'index-ja.html', 'index-en.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};

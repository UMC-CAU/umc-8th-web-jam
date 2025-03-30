/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 🌗 다크 모드 클래스로 적용할 때 꼭 필요!
  theme: {
    extend: {}, // 필요하면 커스터마이징 가능
  },
  plugins: [],
}
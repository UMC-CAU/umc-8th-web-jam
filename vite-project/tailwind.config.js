// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // <-- 이 부분 추가!
    theme: {
      extend: {},
    },
    plugins: [],
  }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Подключаем файлы Vue для анализа
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1da1f2', // Ваши пользовательские цвета
      },
    },
  },
  plugins: [],
};

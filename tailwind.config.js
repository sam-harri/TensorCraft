// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        '72-minus-1px': 'calc(18rem - 1px)', // 16rem is the equivalent of translate-x-64
      },
    },
  },
  plugins: [],
}

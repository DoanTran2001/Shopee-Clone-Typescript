const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false // xóa class container của tailwindcss
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Plugin thêm dấu 3 chấm nếu text dài, vd line-clamp-2 (2 dòng)
    plugin(function({ addComponents, theme }) {
      addComponents({
        // Thêm class theo ý mk
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }
      })
    })
  ]
}

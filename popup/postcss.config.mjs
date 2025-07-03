// export default {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   }
// }


export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
    },
  },
}











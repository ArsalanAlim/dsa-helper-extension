// tailwind.config.js
export default {
  content: [
    './popup.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
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
  plugins: [],
};



// export default {
//   content: [
//     "./popup.html",          
//     "./src/**/*.{js,ts,jsx,tsx}", 
//   ],
//    theme: {
//     extend: {
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0', transform: 'translateY(8px)' },
//           '100%': { opacity: '1', transform: 'translateY(0)' },
//         },
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.4s ease-out forwards', // 
//       },
//     },
//   },
//   plugins: [],
// };
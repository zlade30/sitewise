/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
      extend: {
          backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic':
                  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
          },
          colors: {
              primary: '#0B5697',
              secondary: '#F2F2F7',
              'hover-primary': '#0B3E6B',
              'hover-secondary': '#EDEDF2',
              'list-active': '#E2F1FF',
              'list-text-active': '#0D74CE',
              line: '#D9D9D9',
              'input-secondary': '#F2F2F7',
              error: '#FF3B30'
          }
      }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'off-white': '#FAFAFA',
        'near-black': '#0A0A0A',
        'accent': '#FF6B35',
        'gray-warm': {
          50: '#FAF9F7',
          100: '#F5F3EF',
          200: '#E8E4DC',
          300: '#D4CEC2',
          400: '#B8AF9E',
          500: '#9E9483',
          600: '#7A7265',
          700: '#5C564B',
          800: '#3D3933',
          900: '#1E1C19',
        }
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'geo': ['"Geist"', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['12rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-lg': ['9rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-sm': ['4rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'marquee-left': 'marquee-left 30s linear infinite',
        'marquee-right': 'marquee-right 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};

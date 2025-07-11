import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      animation: {
        'fade-slide-in': 'fadeSlideIn 0.3s ease-out',
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
};

export default config;

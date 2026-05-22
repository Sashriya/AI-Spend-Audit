/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    animation: {
      'spin-slow': 'spin 3s linear infinite',
      'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      'bounce-slow': 'bounce 2s infinite',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    keyframes: {
      blob: {
        '0%': { transform: 'translate(0px, 0px) scale(1)' },
        '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
        '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        '100%': { transform: 'translate(0px, 0px) scale(1)' },
      }
    }
  },
};
export const plugins = [];
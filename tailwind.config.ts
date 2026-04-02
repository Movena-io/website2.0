import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3B',
        blue: {
          DEFAULT: '#1D4ED8',
          hover: '#1E40AF',
          accent: '#60A5FA',
        },
        orange: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
        },
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        text: {
          DEFAULT: '#0F172A',
          muted: '#475569',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
}
export default config

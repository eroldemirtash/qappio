import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Qappio Color Palette
        navy: {
          50: '#f0f2f7',
          100: '#dde1ed',
          200: '#c0c7d9',
          300: '#9aa3c1',
          400: '#6b7aa3',
          500: '#4f5d8a',
          600: '#3f4a72',
          700: '#343d5e',
          800: '#2d334e',
          900: '#0A192F',
          950: '#1a1f2e',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        turquoise: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#38BDF8',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#59E1D9',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'ui-sans-serif', 'system-ui'],
        inter: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'qappio-gradient': 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 50%, #38BDF8 100%)',
        'qappio-gradient-blue': 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        'qappio-gradient-turquoise': 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
      },
      boxShadow: {
        'qappio': '0 24px 80px rgba(0, 0, 0, 0.12)',
        'qappio-lg': '0 32px 96px rgba(0, 0, 0, 0.15)',
        'qappio-xl': '0 40px 120px rgba(0, 0, 0, 0.18)',
      },
      borderRadius: {
        'qappio': '16px',
        'qappio-sm': '10px',
        'qappio-lg': '24px',
        'qappio-xl': '32px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

export default config

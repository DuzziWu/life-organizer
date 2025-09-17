/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Futuristic Dark Theme Colors
        background: {
          primary: '#0a0a0f',
          secondary: '#0f0f1a',
          tertiary: '#1a1a2e',
          card: '#0d1117',
          glass: 'rgba(255, 255, 255, 0.05)',
        },
        surface: {
          primary: '#0a0a0f',
          secondary: '#0d1117',
          tertiary: '#161b22',
          glass: 'rgba(255, 255, 255, 0.05)',
          glow: 'rgba(100, 255, 218, 0.1)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          muted: '#94a3b8',
          accent: '#64ffda',
        },
        border: {
          primary: '#30363d',
          secondary: '#21262d',
          accent: '#00bcd4',
        },
        // Cyber Blue Palette
        'cyber-blue': {
          50: '#e6ffff',
          100: '#b3ffff',
          200: '#80ffff',
          300: '#64ffda',
          400: '#00e5ff',
          500: '#00bcd4',
          600: '#0097a7',
          700: '#00838f',
          800: '#006064',
          900: '#004d5b',
        },
        // Neon Purple Palette
        'neon-purple': {
          50: '#fce4ec',
          100: '#f8bbd9',
          200: '#f48fb1',
          300: '#e1bee7',
          400: '#ba68c8',
          500: '#9c27b0',
          600: '#7b1fa2',
          700: '#6a1b9a',
          800: '#4a148c',
          900: '#3d1a78',
        },
        // Matrix Green Palette
        'matrix-green': {
          50: '#e8f5e8',
          100: '#c8e6c8',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#388e3c',
          700: '#2e7d32',
          800: '#1b5e20',
          900: '#0d5016',
        },
        // Semantic Colors with Glow
        success: {
          DEFAULT: '#4caf50',
          bg: 'rgba(76, 175, 80, 0.1)',
          border: '#4caf50',
          text: '#81c784',
        },
        warning: {
          DEFAULT: '#ff9800',
          bg: 'rgba(255, 152, 0, 0.1)',
          border: '#ff9800',
          text: '#ffb74d',
        },
        error: {
          DEFAULT: '#f44336',
          bg: 'rgba(244, 67, 54, 0.1)',
          border: '#f44336',
          text: '#ef5350',
        },
        info: {
          DEFAULT: '#00bcd4',
          bg: 'rgba(0, 188, 212, 0.1)',
          border: '#00bcd4',
          text: '#64ffda',
        },
      },
      fontFamily: {
        // Futuristic fonts
        'display': ['Orbitron', 'Oxanium', 'Exo 2', 'Inter', 'sans-serif'],
        'body': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'cyber-glow': '0 0 20px rgba(0, 188, 212, 0.3), 0 10px 40px rgba(0, 0, 0, 0.2)',
        'neon': '0 0 10px rgba(100, 255, 218, 0.5)',
        'success-glow': '0 0 20px rgba(76, 175, 80, 0.5)',
        'warning-glow': '0 0 20px rgba(255, 152, 0, 0.5)',
        'error-glow': '0 0 20px rgba(244, 67, 54, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'matrix-reveal': 'matrix-reveal 0.5s ease-out',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'hologram': 'hologram 2s linear infinite',
        'grid-move': 'grid-move 20s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'matrix-reveal': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
            filter: 'blur(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            filter: 'blur(0)',
          },
        },
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor',
          },
          '50%': {
            boxShadow: '0 0 20px currentColor',
          },
        },
        hologram: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': `
          linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
        `,
        'scan-lines': `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(100, 255, 218, 0.03) 2px,
            rgba(100, 255, 218, 0.03) 4px
          )
        `,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),

    // Custom plugin für futuristic utilities
    function({ addUtilities, addComponents, theme }) {
      // Glass morphism utilities
      addUtilities({
        '.glass': {
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'background': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-strong': {
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },

        // Cyber glow utilities
        '.glow-cyber': {
          'box-shadow': '0 0 20px rgba(0, 188, 212, 0.3)',
        },
        '.glow-neon': {
          'box-shadow': '0 0 10px rgba(100, 255, 218, 0.5)',
        },
        '.glow-success': {
          'box-shadow': '0 0 20px rgba(76, 175, 80, 0.5)',
        },
        '.glow-error': {
          'box-shadow': '0 0 20px rgba(244, 67, 54, 0.5)',
        },

        // Text glow utilities
        '.text-glow': {
          'text-shadow': '0 0 10px currentColor',
        },
        '.text-glow-strong': {
          'text-shadow': '0 0 20px currentColor',
        },

        // Border glow utilities
        '.border-glow': {
          'box-shadow': '0 0 10px rgba(0, 188, 212, 0.3)',
        },

        // Scan line effect
        '.scan-lines': {
          'background-image': `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(100, 255, 218, 0.03) 2px,
            rgba(100, 255, 218, 0.03) 4px
          )`,
        },

        // Grid pattern
        '.grid-pattern': {
          'background-image': `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
          'background-size': '50px 50px',
        },
      });

      // Futuristic components
      addComponents({
        '.widget-container': {
          'background': `linear-gradient(135deg, ${theme('colors.surface.secondary')}, ${theme('colors.surface.tertiary')})`,
          'border': `1px solid ${theme('colors.border.primary')}`,
          'border-radius': theme('borderRadius.2xl'),
          'padding': theme('spacing.5'),
          'position': 'relative',
          'overflow': 'hidden',
          'transition': 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',

          '&:hover': {
            'border-color': theme('colors.border.accent'),
            'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(100, 255, 218, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            'transform': 'translateY(-4px) scale(1.02)',
          },

          '&.dragging': {
            'transform': 'rotate(3deg) scale(1.08)',
            'box-shadow': '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 2px #00bcd4, 0 0 30px rgba(0, 188, 212, 0.4)',
            'z-index': '1000',
            'border-color': '#00bcd4',
          },
        },

        '.cyber-button': {
          'position': 'relative',
          'font-weight': theme('fontWeight.medium'),
          'transition': 'all 300ms',
          'border-radius': theme('borderRadius.lg'),
          'border': '1px solid',
          'font-family': theme('fontFamily.mono'),
          'text-transform': 'uppercase',
          'letter-spacing': theme('letterSpacing.wide'),
        },

        '.cyber-input': {
          'background': theme('colors.surface.secondary'),
          'border': `1px solid ${theme('colors.border.primary')}`,
          'border-radius': theme('borderRadius.lg'),
          'padding': `${theme('spacing.3')} ${theme('spacing.4')}`,
          'color': theme('colors.text.primary'),
          'font-family': theme('fontFamily.mono'),
          'font-size': theme('fontSize.sm'),
          'transition': 'all 300ms',

          '&:focus': {
            'border-color': theme('colors.cyber-blue.500'),
            'box-shadow': `0 0 0 2px rgba(0, 188, 212, 0.2)`,
            'background': theme('colors.surface.tertiary'),
            'outline': 'none',
          },
        },
      });
    },
  ],
};
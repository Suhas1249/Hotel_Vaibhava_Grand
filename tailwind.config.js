/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ====================================================================
      // COLOR PALETTE
      // ====================================================================
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#F0FDFC',
          100: '#D5F2ED',
          200: '#ABEBE4',
          300: '#80DDD6',
          400: '#4ECDC4',
          500: '#44B0AA',
          600: '#3A9A95',
          700: '#2E7A79',
          800: '#235D5B',
          900: '#1A3F3F',
        },

        // Neutral Scale (Grays)
        neutral: {
          50: '#FAFAFA',
          100: '#F8F9FB',
          200: '#E8E8F0',
          300: '#D5D5E8',
          400: '#A8A8BA',
          500: '#7A7A9E',
          600: '#5A5A7A',
          700: '#3A3A55',
          800: '#1A1A2E',
          900: '#0F0F1E',
        },

        // Accent Colors
        accent: {
          rose: {
            50: '#FFF8F8',
            100: '#FFD6D6',
            200: '#FFA8A8',
            300: '#FF8A8A',
            400: '#FF6B6B',
            500: '#FF5252',
          },
          peach: {
            50: '#FFF9F5',
            100: '#FFE5CC',
            200: '#FFCC99',
            300: '#FFB366',
            400: '#FF9933',
            500: '#FF8800',
          },
          lavender: {
            50: '#F9F7FF',
            100: '#E8D5F2',
            200: '#D5B8E8',
            300: '#C299D8',
            400: '#A866CC',
            500: '#8F33BB',
          },
          mint: {
            50: '#F5FFFB',
            100: '#D5F2ED',
            200: '#ABEAE0',
            300: '#80DDD6',
            400: '#55D0CC',
            500: '#2AC3C3',
          },
        },

        // Functional Colors
        success: '#6BCF7F',
        warning: '#FFC107',
        error: '#FF6B6B',
        info: '#4ECDC4',

        // Gradients (reference only; use via gradient class)
        gradient: {
          'teal-fade': 'linear-gradient(135deg, #4ECDC4 0%, #44A0A0 100%)',
          'rose-peach': 'linear-gradient(90deg, #FFD6D6 0%, #FFE5CC 100%)',
          'lavender-mint': 'linear-gradient(90deg, #E8D5F2 0%, #D5F2ED 100%)',
        },
      },

      // ====================================================================
      // TYPOGRAPHY
      // ====================================================================
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Custom type scale
        'heading-1': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
      },

      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      // ====================================================================
      // SPACING & LAYOUT
      // ====================================================================
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',

        // Safe area insets (mobile)
        'safe-t': 'env(safe-area-inset-top)',
        'safe-r': 'env(safe-area-inset-right)',
        'safe-b': 'env(safe-area-inset-bottom)',
        'safe-l': 'env(safe-area-inset-left)',
      },

      // ====================================================================
      // SHADOWS
      // ====================================================================
      boxShadow: {
        'xs': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0px 2px 8px rgba(0, 0, 0, 0.08)',
        'md': '0px 4px 12px rgba(0, 0, 0, 0.12)',
        'lg': '0px 8px 16px rgba(0, 0, 0, 0.15)',
        'xl': '0px 12px 24px rgba(0, 0, 0, 0.2)',
        '2xl': '0px 20px 32px rgba(0, 0, 0, 0.25)',

        // Elevation system (Material Design inspired)
        'elevation-2': '0px 2px 8px rgba(0, 0, 0, 0.12)',
        'elevation-4': '0px 4px 12px rgba(0, 0, 0, 0.15)',
        'elevation-8': '0px 8px 16px rgba(0, 0, 0, 0.2)',

        // Glow effects
        'glow-teal': '0px 4px 20px rgba(78, 205, 196, 0.3)',
        'glow-rose': '0px 4px 20px rgba(255, 107, 107, 0.3)',
        'glow-gold': '0px 4px 20px rgba(255, 193, 7, 0.3)',

        // Subtle inner shadows (cards)
        'inset-subtle': 'inset 0px 1px 2px rgba(255, 255, 255, 0.5)',

        // Navigation bar
        'nav-top': '0px -2px 8px rgba(0, 0, 0, 0.08)',
      },

      // ====================================================================
      // BORDER RADIUS
      // ====================================================================
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',

        // Specific component radius
        'card': '20px',
        'input': '16px',
        'button': '12px',
        'badge': '8px',
        'pill': '24px',
      },

      // ====================================================================
      // ANIMATION & TRANSITIONS
      // ====================================================================
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'scaleIn': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'slower': '400ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ====================================================================
      // BACKDROP BLUR
      // ====================================================================
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },

      // ====================================================================
      // OPACITY
      // ====================================================================
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
      },

      // ====================================================================
      // MIN/MAX SIZES
      // ====================================================================
      minHeight: {
        'touch': '48px',
        'nav': '64px',
      },

      minWidth: {
        'touch': '48px',
      },

      maxWidth: {
        'mobile': '428px',
        'tablet': '768px',
        'desktop': '1024px',
      },

      // ====================================================================
      // GRADIENT BACKGROUNDS
      // ====================================================================
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #4ECDC4 0%, #44A0A0 100%)',
        'gradient-rose-peach': 'linear-gradient(90deg, #FFD6D6 0%, #FFE5CC 100%)',
        'gradient-lavender-mint': 'linear-gradient(90deg, #E8D5F2 0%, #D5F2ED 100%)',
        'gradient-purple-pink': 'linear-gradient(90deg, #E8D5F2 0%, #FFD6D6 100%)',
        'gradient-card-overlay': 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.25) 100%)',
      },

      // ====================================================================
      // ACCENT COLORS (for borders, outlines)
      // ====================================================================
      accentColor: {
        primary: '#4ECDC4',
      },

      // ====================================================================
      // RING (for focus states)
      // ====================================================================
      ringColor: {
        'primary': '#4ECDC4',
        'focus': '#D5F2ED',
      },

      ringWidth: {
        'default': '2px',
      },

      ringOffsetWidth: {
        'default': '2px',
      },

      // ====================================================================
      // SCREENS (Responsive Breakpoints)
      // ====================================================================
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '428px',
        'lg': '600px',
        'xl': '900px',
        '2xl': '1200px',
      },
    },
  },

  // ========================================================================
  // PLUGINS
  // ========================================================================
  plugins: [
    // Custom utilities
    function ({ addUtilities }) {
      const newUtilities = {
        // Text truncation utilities
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },

        // Scrollbar hiding
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },


        // Glass morphism effect
        '.glass': {
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        },

        // Safe area padding
        '.safe-padding': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
        },

        // Touch target (minimum 48x48px)
        '.touch-target': {
          minHeight: '48px',
          minWidth: '48px',
        },

        // Text gradient
        '.text-gradient': {
          backgroundImage: 'linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 100%)',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};

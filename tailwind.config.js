/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn semantic colors (mapped to CSS variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ReelSmith custom colors
        obsidian: {
          DEFAULT: '#050508',
          elevated: '#0a0a0f',
          surface: '#0f0f15',
          hover: '#15151d',
        },
        inferno: {
          50: '#fff9e6',
          100: '#ffefb3',
          200: '#ffe580',
          300: '#ffdb4d',
          400: '#ffd11a',
          500: '#ffad00',
          600: '#e69900',
          700: '#b37700',
          800: '#805500',
          900: '#4d3300',
        },
        plasma: {
          50: '#f5e6ff',
          100: '#e0b3ff',
          200: '#cc80ff',
          300: '#b84dff',
          400: '#a31aff',
          500: '#8f00ff',
          600: '#7300cc',
          700: '#5c00a3',
          800: '#460080',
          900: '#30005c',
        },
        frost: {
          5: 'rgba(255, 255, 255, 0.05)',
          10: 'rgba(255, 255, 255, 0.10)',
          15: 'rgba(255, 255, 255, 0.15)',
          20: 'rgba(255, 255, 255, 0.20)',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Monument Extended', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        xs: '10px',
        sm: '20px',
        DEFAULT: '30px',
        lg: '40px',
        xl: '50px',
      },
      animation: {
        'crystallize': 'crystallize 0.4s ease-out forwards',
        'ambient-pulse': 'ambient-pulse 3s ease-in-out infinite',
        'fluid-fill': 'fluid-fill 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        crystallize: {
          '0%': {
            opacity: '0',
            filter: 'blur(20px)',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0)',
            transform: 'scale(1)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'ambient-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 173, 0, 0.15)' },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 173, 0, 0.15), 0 0 60px rgba(143, 0, 255, 0.15)',
          },
        },
        'fluid-fill': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #ffad00 0%, #8f00ff 100%)',
        'gradient-brand-horizontal': 'linear-gradient(90deg, #ffad00 0%, #8f00ff 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

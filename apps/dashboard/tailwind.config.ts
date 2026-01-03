import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1100px',
      },
    },
    extend: {
      // Autonops color palette
      colors: {
        // Primary - Blue
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#3b82f6',
          foreground: '#ffffff',
        },
        
        // Semantic colors
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        
        // Background colors
        background: {
          DEFAULT: '#ffffff',
          alt: '#f9fafb',
          dark: '#111827',
          'dark-alt': '#1f2937',
        },
        
        // Text colors
        foreground: {
          DEFAULT: '#1f2937',
          light: '#6b7280',
          dark: '#f9fafb',
          'dark-light': '#9ca3af',
        },
        
        // Border colors
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#374151',
        },
        
        // Card colors
        card: {
          DEFAULT: '#ffffff',
          dark: '#1f2937',
          foreground: '#1f2937',
          'dark-foreground': '#f9fafb',
        },
        
        // Code colors
        code: {
          bg: '#0d1117',
          text: '#e5e7eb',
        },
        
        // Muted colors (for Shadcn compatibility)
        muted: {
          DEFAULT: '#f9fafb',
          foreground: '#6b7280',
        },
        
        // Accent colors (for Shadcn compatibility)
        accent: {
          DEFAULT: '#f9fafb',
          foreground: '#1f2937',
        },
        
        // Popover colors (for Shadcn compatibility)
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#1f2937',
        },
        
        // Input colors (for Shadcn compatibility)
        input: '#e5e7eb',
        ring: '#2563eb',
      },
      
      // Typography
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },
      
      // Font sizes matching existing site
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        'section': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'card-title': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      
      // Spacing
      spacing: {
        'section': '80px',
        'card': '32px',
      },
      
      // Border radius
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      
      // Box shadow
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      
      // Animations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config

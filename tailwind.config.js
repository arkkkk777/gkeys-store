import { colors, spacing, borderRadius, typography, breakpoints, animations, shadows } from './src/styles/design-tokens.ts';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Design System Colors
      colors: {
        // Design tokens colors (primary source)
        'design-primary': colors.primary,
        'design-primary-dark': colors.primaryDark,
        'design-accent': colors.accent,
        'design-background': colors.background,
        'design-surface': colors.surface,
        'design-surface-light': colors.surfaceLight,
        'design-surface-hover': colors.surfaceHover,
        'design-text': colors.text,
        'design-text-secondary': colors.textSecondary,
        'design-text-muted': colors.textMuted,
        'design-border': colors.border,
        'design-error': colors.error,
        'design-warning': colors.warning,
        'design-success': colors.success,
        'design-discount': colors.discount,
        // shadcn/ui colors (for compatibility)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      // Design System Spacing
      spacing: {
        'design-xs': spacing.xs,
        'design-sm': spacing.sm,
        'design-md': spacing.md,
        'design-lg': spacing.lg,
        'design-xl': spacing.xl,
        'design-xxl': spacing.xxl,
      },
      // Design System Border Radius
      borderRadius: {
        'design-sm': borderRadius.sm,
        'design-md': borderRadius.md,
        'design-lg': borderRadius.lg,
        'design-xl': borderRadius.xl,
        'design-full': borderRadius.full,
        // shadcn/ui borderRadius (for compatibility)
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Design System Typography
      fontFamily: {
        'design': typography.fontFamily.split(',').map(f => f.trim()),
      },
      fontSize: {
        'design-xs': typography.fontSize.xs,
        'design-sm': typography.fontSize.sm,
        'design-md': typography.fontSize.md,
        'design-lg': typography.fontSize.lg,
        'design-xl': typography.fontSize.xl,
        'design-2xl': typography.fontSize['2xl'],
        'design-3xl': typography.fontSize['3xl'],
      },
      fontWeight: {
        'design-normal': typography.fontWeight.normal,
        'design-medium': typography.fontWeight.medium,
        'design-semibold': typography.fontWeight.semibold,
        'design-bold': typography.fontWeight.bold,
      },
      lineHeight: {
        'design-tight': typography.lineHeight.tight,
        'design-normal': typography.lineHeight.normal,
        'design-relaxed': typography.lineHeight.relaxed,
      },
      // Design System Breakpoints
      screens: {
        'design-mobile': breakpoints.mobile,
        'design-tablet': breakpoints.tablet,
        'design-desktop': breakpoints.desktop,
        'design-wide': breakpoints.wide,
      },
      // Design System Shadows
      boxShadow: {
        'design-sm': shadows.sm,
        'design-md': shadows.md,
        'design-lg': shadows.lg,
        'design-card': shadows.card,
        'design-glow': shadows.glow,
        'design-glow-accent': shadows.glowAccent,
      },
      // Design System Transitions
      transitionDuration: {
        'design-fast': animations.duration.fast,
        'design-standard': animations.duration.standard,
        'design-slow': animations.duration.slow,
      },
      transitionTimingFunction: {
        'design-ease': animations.easing.ease,
        'design-ease-in': animations.easing.easeIn,
        'design-ease-out': animations.easing.easeOut,
        'design-ease-in-out': animations.easing.easeInOut,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}


import type { Config } from 'tailwindcss'

// Semantic tokens resolve to CSS custom properties defined in src/index.css,
// so light/dark are two token sets (per docs/brand-visual.md), not two
// hand-maintained style trees. Dark mode is class-strategy (`.dark` on <html>).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        band: 'var(--color-band)',
        'band-ink': 'var(--color-band-ink)',
        navy: 'var(--color-navy)',
        cta: 'var(--color-cta)',
        'cta-hover': 'var(--color-cta-hover)',
        'accent-pink': 'var(--color-accent-pink)',
        'accent-purple': 'var(--color-accent-purple)',
        'accent-teal': 'var(--color-accent-teal)',
      },
      fontFamily: {
        display: ['Explode', 'Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

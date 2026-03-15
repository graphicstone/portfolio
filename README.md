# Harishiv Singh — Portfolio

Personal portfolio website built with React and Vite. Showcases work experience, projects, and skills with an emphasis on performance and polished UI animations.

## Live

[harishiv.cv](https://harishiv.cv)

## Tech Stack

| Category | Libraries |
|----------|-----------|
| Framework | React 18, Vite 7 |
| UI | MUI v5 (Material UI) |
| Animation | Framer Motion v11, React Bits (Galaxy, BlurText, DecryptedText) |
| WebGL | ogl (Galaxy starfield background) |
| Smooth scroll | Lenis |
| Forms | Formik + Firebase |
| Icons | react-icons (fi, si) |
| Analytics | Vercel Analytics |

## Features

- **Galaxy background** — WebGL starfield with mouse repulsion, twinkling, and slow rotation
- **DecryptedText** — character scramble reveal animation on the hero name
- **BlurText** — word-by-word blur-in on all section headings
- **Experience accordion** — expandable cards with tech stack tags and CURRENT role indicator
- **Projects section** — card grid with hover overlay animation
- **Contact form** — Formik-validated form backed by Firebase
- **Smooth scrolling** — Lenis for inertia-based scroll
- **Responsive** — mobile-first layout with MUI breakpoints

## Project Structure

```
src/
├── components/        # Reusable UI — Galaxy, BlurText, DecryptedText, SectionHeading, SocialButton, MarqueeStrip
├── config/            # AppTheme, ColorPalette, Firebase config
├── constants/         # FontsEnum
├── hooks/             # useScrolled
├── assets/            # Company logos (SVG + WebP)
└── pages/
    └── landing/
        ├── LandingPage.jsx
        └── sections/
            ├── hero/
            ├── experience/
            ├── projects/
            ├── skills/
            ├── about/
            ├── contact/
            └── toolbar/
```

## Getting Started

```bash
npm install
npm run dev
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

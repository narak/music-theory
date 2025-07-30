# Music Theory Application

A modern React application for learning music theory, featuring interactive fretboard visualization, scales, chords, and educational tours.

## Features

- Interactive guitar fretboard with note visualization
- Scale and chord exploration
- Educational guided tours
- Responsive design with modern UI components
- Dark theme support

## Tech Stack

- **React 18** - Modern React with concurrent features
- **Vite** - Lightning fast build tool and dev server
- **shadcn/ui** - Modern component library built on Radix UI and Tailwind CSS
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Modules** - Scoped styling with CSS custom properties
- **ESLint & Prettier** - Code quality and formatting

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

This will start the development server at `http://localhost:9000`

### Building for Production

```bash
npm run build
```

This will create optimized production builds in the `static/build` directory.

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix

## Modernization Updates

This project has been upgraded from Webpack 4 to Vite 5 with the following improvements:

- ✅ React 16 → React 18 (with createRoot API)
- ✅ Webpack 4 → Vite 5 (faster builds and HMR)
- ✅ Babel → Native ES6+ (via Vite/esbuild)
- ✅ Old ESLint → Modern ESLint 8 with React hooks support
- ✅ CSS Modules with custom properties (replaced @value syntax)
- ✅ Ant Design → shadcn/ui (modern component library with Radix UI + Tailwind CSS)
- ✅ Added Tailwind CSS for utility-first styling
- ✅ Removed deprecated react-hot-loader
- ✅ Modern development workflow
- ✅ Reduced bundle size (370KB vs 662KB previously)

## Project Structure

```
src/
├── components/          # React components
│   ├── App.jsx         # Main application component
│   ├── Notes.jsx       # Note visualization component
│   ├── Fretboard.jsx   # Guitar fretboard component
│   └── ...
├── constants/          # Application constants
├── utils/              # Utility functions
└── vars.module.css     # CSS custom properties
```

### Features Planned
- Add 9th chords
- Add chord finder

## License

MIT

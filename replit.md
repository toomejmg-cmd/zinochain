# Zinochain - AI-Powered Solana Trading Ecosystem

## Overview

Zinochain is a modern, single-page marketing website for an AI-powered Solana trading ecosystem featuring a Telegram bot called Zinobot. The application is built as a full-stack web application with a React frontend and Express backend, designed to showcase the Zinobot product through an engaging, animated landing page experience.

The project prioritizes visual appeal with a dark theme, neon gradients, and meme culture aesthetics (inspired by platforms like Phantom and Solana.com). The site includes multiple sections: Home (main landing), Referral program details, and Documentation pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast hot module replacement
- **Wouter** for client-side routing (lightweight alternative to React Router)
- Single-page application architecture with smooth scroll navigation

**UI Components & Styling**
- **Shadcn/ui** component library (New York style variant) for accessible, customizable UI components
- **Radix UI** primitives as the foundation for complex interactive components
- **Tailwind CSS** for utility-first styling with custom theme configuration
- **Framer Motion** for scroll-based animations and transitions
- Custom particle background effects for visual enhancement

**Design System**
- Dark mode by default with purple/blue neon gradient accents
- Custom color system using HSL color space with CSS variables
- Consistent spacing units (4, 8, 12, 16, 20, 24, 32px)
- Typography hierarchy using Inter/Poppins fonts
- Responsive design with mobile-first breakpoints

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- Local component state using React hooks
- No global state management library (unnecessary for this marketing site)

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- ESM (ECMAScript Modules) for modern JavaScript module system
- Custom middleware for request logging and JSON parsing
- Vite integration for development hot reloading

**Development vs Production**
- Development: Vite dev server middleware integrated with Express
- Production: Pre-built static assets served from Express
- Custom error handling with runtime error overlay in development

**API Structure**
- RESTful API design with `/api` prefix for all backend routes
- Currently minimal backend logic (placeholder routes in `server/routes.ts`)
- Designed to be extended with actual business logic as needed

### Data Storage

**Database Configuration**
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** as the target database (via Neon serverless driver)
- Schema-first approach with TypeScript type inference
- Migration system using Drizzle Kit

**Current Schema**
- Users table with UUID primary keys, username, and password fields
- Schema defined in shared directory for access by both client and server
- Zod integration for runtime validation

**Storage Abstraction**
- `IStorage` interface defining CRUD operations
- `MemStorage` in-memory implementation for development/testing
- Designed to be swapped with actual database implementation without changing application code

### External Dependencies

**Third-Party Services**
- **Telegram** - Main integration point for Zinobot (external bot, linked from website)
- **MoonPay** - Crypto purchase widget integration (external service)
- **Neon Database** - Serverless PostgreSQL hosting

**UI & Animation Libraries**
- **Radix UI** - Comprehensive set of accessible component primitives (accordion, dialog, dropdown, popover, etc.)
- **Framer Motion** - Production-ready animation library for React (also powers MagicCard interactive effects)
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Additional icons (specifically Solana logo)
- **Embla Carousel** - Carousel/slider functionality
- **Three.js** - WebGL library for PixelBlast background animations
- **Custom MagicCard** - Interactive card wrapper with particles, tilt, magnetism, click ripples, and glow effects

**Development Tools**
- **Replit** specific plugins for development environment integration
- **TypeScript** for type checking across entire codebase
- **ESBuild** for production server bundling
- **PostCSS** with Autoprefixer for CSS processing

**Form & Validation**
- **React Hook Form** for form state management
- **Zod** for schema validation
- **@hookform/resolvers** for Zod integration with React Hook Form

**Session Management**
- **connect-pg-simple** - PostgreSQL session store for Express sessions (configured but not actively used in current implementation)

## Recent Updates (November 8, 2025)

### GridScan 3D Animation (Hero Section)
Added GridScan WebGL-based 3D grid animation to hero section background:
- **Component**: Three.js shader-based component (`GridScan.tsx`) with interactive 3D perspective grid
- **Animation**: Pingpong scanning animation with glowing scan lines sweeping across the grid
- **Visual**: Purple grid lines (#B19EEF) with pink/magenta scan lines (#FF9FFC)
- **Interactivity**: Grid tilts and skews based on mouse cursor position with physics-based smooth damping
- **Post-Processing**: Bloom effects, chromatic aberration, and film grain for depth
- **WebGL Fallback**: Gracefully degrades when WebGL unavailable (headless browsers, older devices)
- **Configuration**: scanDuration 3s, scanDelay 1.5s, gridScale 0.12, lineJitter 0.15 for subtle movement
- Provides immersive, futuristic background for hero section while maintaining content readability

### StarBorder Animation (Features Section)
Added StarBorder rotating gradient border animation to "Why Choose Zinobot" feature cards:
- **Component**: Custom React component (`StarBorder.tsx`) with CSS-based rotating gradients
- **Animation**: Two radial gradient layers rotating in opposite directions (forward and reverse)
- **Visual**: Purple (#B19EEF) glowing gradient spots that continuously rotate around card borders
- **Applied to**: All 4 feature cards (AI-Powered Trading Bot, Real-Time Market Signals, Secure & Non-Custodial, Easy to Use)
- **Configuration**: 6-second rotation speed, 2px thickness, 2.5x gradient scale
- **Effect**: Creates dynamic "star" or "glowing point" effect moving along borders, adding visual interest to feature cards

### ElectricBorder Animation (About Section)
Added ElectricBorder animated border effect to About Zinochain cards:
- **Component**: Custom React component (`ElectricBorder.tsx`) with SVG-based animated border
- **Animation**: Uses SVG filters with turbulence and displacement mapping for electric/glowing effect
- **Visual**: Purple (#B19EEF) glowing animated border with multiple glow layers (stroke, glow-1, glow-2, background-glow)
- **Cards**: Removed solid backgrounds to let the electric border animation stand out
- **Configuration**: Speed: 1, Chaos: 1, Thickness: 2px
- **Effect**: Creates dynamic "electric" border that animates continuously around each About section card
- Works alongside MagicCard interactive effects (particles, tilt, magnetism)

### Logo Integration
Added the official Zinochain gradient logo (cyan-to-purple "Z" in circle with black background) throughout the site:
- **Navbar**: 40x40px logo with black background displayed next to brand name with 12px gap
- **Footer**: 48x48px logo with black background displayed next to brand name with 12px gap
- **Hero Section**: 64x64px spinning logo with black background in circular container with gradient border
  - 8-second continuous rotation animation
  - Smooth linear infinite spin
  - Respects `prefers-reduced-motion` accessibility setting
- All logos use the same consistent gradient "Z" design with black background
- Properly aligned with flexbox layout for unified branding across all sections

## Previous Updates (November 7, 2025)

### Interactive Card Animations
Added `MagicCard` component that wraps all cards (except hero section) with interactive effects:
- **Particle System**: Animated floating particles that appear on hover
- **3D Tilt Effect**: Cards tilt based on mouse position using Framer Motion springs
- **Magnetic Effect**: Cards slightly move toward cursor position
- **Click Ripple**: Expanding ripple animation on click
- **Dynamic Glow**: Spotlight effect that follows the mouse cursor
- **Border Glow**: Animated border that activates on hover

Different sections use different glow colors:
- About cards: Purple (177, 158, 239) - 8 particles
- Rewards counter: Golden (251, 191, 36) - 15 particles (most dramatic)
- Rewards types: Golden (251, 191, 36) - 6 particles, no magnetism
- Get Started steps: Pink (244, 114, 182) - 10 particles

### Background Animations
PixelBlast WebGL animations have been temporarily disabled using a fallback component to ensure smooth page loading and scrolling across all browsers and devices. The animations were causing compatibility issues in environments without WebGL support. The site now focuses on:
- **Smooth scrolling behavior** with CSS scroll-behavior: smooth
- **MagicCard animations** which provide engaging interactivity
- **Optimized performance** for better user experience
- **Accessibility improvements** with prefers-reduced-motion support

Future consideration: Re-enable PixelBlast with proper error handling and WebGL feature detection.
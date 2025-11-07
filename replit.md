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
- **Framer Motion** - Production-ready animation library for React
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Additional icons (specifically Solana logo)
- **Embla Carousel** - Carousel/slider functionality

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
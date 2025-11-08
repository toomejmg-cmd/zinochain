# Zinochain - Telegram-Based Solana Trading Ecosystem

## Overview
Zinochain is a full-stack web application featuring a Telegram bot called Zinobot for AI-powered Solana trading. The project includes a marketing website with engaging animations and an admin dashboard for monitoring. All trading happens exclusively through the Telegram bot. The website prioritizes visual appeal with a dark theme, neon gradients, and meme culture aesthetics, featuring Home, Referral, and Documentation pages.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Purpose**: Marketing website and admin dashboard (no user wallet connection)
- **Frameworks**: React 18 with TypeScript, Vite for build/dev server, Wouter for routing.
- **UI/UX**: Shadcn/ui (New York style), Radix UI primitives, Tailwind CSS for styling, Framer Motion for animations.
- **Design**: Dark mode with purple/blue neon gradients, HSL custom color system, Inter/Poppins fonts, responsive design.
- **State Management**: TanStack Query (React Query v5) for server state, React hooks for local state.
- **Animations**: Custom particle backgrounds, GridScan 3D animation (Three.js), StarBorder, BubbleAnimation, ElectricBorder.
- **Interactive Elements**: MagicCard component for interactive effects (particles, tilt, magnetism, click ripple, dynamic glow).

### Backend
- **Framework**: Express.js with Node.js and TypeScript (ESM).
- **Authentication**: Replit Auth (OpenID Connect) for admin dashboard access only.
- **Session Management**: PostgreSQL-backed sessions (connect-pg-simple).
- **API**: RESTful API design (`/api` prefix) with public and admin-protected endpoints.

### Data Storage
- **Database**: PostgreSQL (via Neon serverless driver).
- **ORM**: Drizzle ORM for type-safe operations, Drizzle Kit for migrations.
- **Schema**: `users`, `sessions`, `tokens`, `trades`, `tokenClaims`, `investments`, `referrals`, `communityStats`, `analyticsEvents`.
- **Abstraction**: `IStorage` interface with `DbStorage` implementation using Drizzle ORM.

### Key Features
- **Trading**: All trading happens through the Telegram bot (@zinochainbot)
- **Admin Dashboard**: Monitor trades, manage token claims, view stats (Replit Auth protected)
- **Live Token Prices**: DexScreener API integration for real-time Raydium token data
- **Branding**: Official Zinochain gradient logo integrated throughout the site with animations

## External Dependencies

### Third-Party Services
- **Telegram**: Primary interface for Zinobot trading bot
- **Neon Database**: Serverless PostgreSQL hosting
- **DexScreener API**: Real-time token price data
- **Replit Auth**: OAuth authentication service for admin dashboard

### UI & Animation Libraries
- **Radix UI**: Accessible component primitives.
- **Framer Motion**: Production-ready animation library.
- **Lucide React**, **React Icons**: Icon libraries.
- **Embla Carousel**: Carousel functionality.
- **Three.js**: WebGL library for 3D animations.

### Development Tools
- **Replit**: Specific plugins for development environment.
- **TypeScript**: Type checking.
- **ESBuild**: Production server bundling.
- **PostCSS** with Autoprefixer: CSS processing.

### Form & Validation
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.
- **@hookform/resolvers**: Zod integration with React Hook Form.

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions.
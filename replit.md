# Zinochain - AI-Powered Solana Trading Ecosystem

## Overview
Zinochain is a full-stack web application for an AI-powered Solana trading ecosystem, featuring a Telegram bot called Zinobot. The project includes a marketing website with engaging animations and an authenticated user dashboard for trading, claiming tokens, and managing investments. It prioritizes visual appeal with a dark theme, neon gradients, and meme culture aesthetics, encompassing a Home page, Referral program, Documentation, and a crypto trading Dashboard.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Frameworks**: React 18 with TypeScript, Vite for build/dev server, Wouter for routing.
- **UI/UX**: Shadcn/ui (New York style), Radix UI primitives, Tailwind CSS for styling, Framer Motion for animations.
- **Design**: Dark mode with purple/blue neon gradients, HSL custom color system, Inter/Poppins fonts, responsive design.
- **State Management**: TanStack Query (React Query v5) for server state, React hooks for local state.
- **Animations**: Custom particle backgrounds, GridScan 3D animation (Three.js), StarBorder, BubbleAnimation, ElectricBorder.
- **Interactive Elements**: MagicCard component for interactive effects (particles, tilt, magnetism, click ripple, dynamic glow).

### Backend
- **Framework**: Express.js with Node.js and TypeScript (ESM).
- **Authentication**:
    - **Primary**: Wallet-Based Authentication (Phantom wallet) using Ed25519 signature verification and nonce challenges.
    - **Fallback**: Replit Auth (OpenID Connect) for admin access.
    - Session management via PostgreSQL.
- **API**: RESTful API design (`/api` prefix) with public, protected, and admin endpoints.

### Data Storage
- **Database**: PostgreSQL (via Neon serverless driver).
- **ORM**: Drizzle ORM for type-safe operations, Drizzle Kit for migrations.
- **Schema**: `users`, `wallet_nonces`, `sessions`, `tokens`, `trades`, `tokenClaims`, `investments`, `referrals`, `communityStats`, `analyticsEvents`.
- **Abstraction**: `IStorage` interface with `DbStorage` implementation using Drizzle ORM.

### Key Features
- **User Dashboard**: Overview, Trade (live prices from DexScreener), Claims, Invest, Referral, Wallet.
- **Live Token Prices**: DexScreener API integration for real-time Raydium token data.
- **Branding**: Official Zinochain gradient logo integrated throughout the site with animations.

## External Dependencies

### Third-Party Services
- **Telegram**: Integration for Zinobot.
- **Phantom Wallet**: Solana wallet provider.
- **Neon Database**: Serverless PostgreSQL hosting.
- **DexScreener API**: Real-time token price data.
- **Replit Auth**: OAuth authentication service (admin fallback).

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
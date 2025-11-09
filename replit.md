# Zinochain - Telegram-Based Multi-Chain Trading Ecosystem

## Overview
Zinochain is a full-stack web application featuring a Telegram bot called Zinochain Bot for AI-powered multi-chain trading. The bot supports trading across Solana, Ethereum, and BSC blockchains. The project includes a marketing website with engaging animations and an admin dashboard for monitoring. All trading happens exclusively through the Telegram bot (@zinochainbot). The website prioritizes visual appeal with a dark theme, neon gradients, and modern aesthetics, featuring Home, Referral, and Documentation pages.

## Recent Changes (November 2025)
- **Multi-Chain Rebranding**: Rebranded from "Zinobot" (Solana-only) to "Zinochain Bot" (multi-chain)
- **Supported Blockchains**: Now explicitly supports Solana, Ethereum, and Binance Smart Chain (BSC)
- **Updated Features**: Multi-chain token swaps, cross-chain portfolio tracking, P2P transfers on all chains
- **Documentation Updates**: Added Multi-Chain Support section, updated wallet connection guide
- **Chain Switching**: Added /chain command for switching between networks
- **Removed References**: Eliminated mentions of "Jupiter" and "1inch" aggregators from user-facing content
- **Features Section Design**: Implemented 2-column grid layout with prominent AI-Powered card and lemon green (#a8e063) glowing borders
- **Automated Rewards System**: Backend service automatically updates rewards total every 6 hours with random amounts ($10-$7312), starting at $471,552
- **Hero Section Update**: Changed headline to "Smarter Trades. Faster Decisions. Zinochain." with white text and sky blue subheader

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
- **Schema**: `users`, `sessions`, `tokens`, `trades`, `tokenClaims`, `investments`, `referrals`, `communityStats`, `analyticsEvents`, `automatedRewards`.
- **Abstraction**: `IStorage` interface with `DbStorage` implementation using Drizzle ORM.

### Key Features
- **Multi-Chain Trading**: Trade seamlessly across Solana, Ethereum, and BSC through the Telegram bot (@zinochainbot)
- **Cross-Chain Wallets**: AES-256 encrypted non-custodial wallets for all supported chains
- **Chain Switching**: Use /chain command to switch between Solana, Ethereum, and BSC networks
- **Admin Dashboard**: Monitor trades, manage token claims, view stats (Replit Auth protected)
- **Live Token Prices**: DexScreener API integration for real-time token data across chains
- **Automated Rewards**: Backend service updates rewards total every 6 hours (+$10-$7312 random increments), starting at $471,552
- **Branding**: Official Zinochain gradient logo integrated throughout the site with animations

## External Dependencies

### Third-Party Services
- **Telegram**: Primary interface for Zinochain Bot trading bot
- **Neon Database**: Serverless PostgreSQL hosting
- **DexScreener API**: Real-time token price data across Solana, Ethereum, and BSC
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
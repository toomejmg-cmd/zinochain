# Zinochain Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern crypto platforms (Phantom, Solana.com) meets meme culture aesthetics (Pepe-style playfulness). This is a marketing/landing experience that prioritizes visual impact and community engagement.

## Core Aesthetic
- **Theme**: Dark mode with neon purple/blue gradients
- **Mood**: "Meme meets Tech" - playful yet professional
- **Visual Treatment**: Glowing elements, animated gradients, particle effects
- **Typography**: Inter or Poppins, bold headings with gradient text effects

## Layout System
**Spacing Units**: Use Tailwind's 4, 8, 12, 16, 20, 24, 32 units consistently
- Section padding: py-20 desktop, py-12 mobile
- Container: max-w-7xl with px-4
- Component spacing: gap-8 for grids, space-y-6 for vertical stacks

## Typography Hierarchy
- **Hero Title**: text-5xl md:text-7xl, font-bold, gradient text
- **Section Headings**: text-3xl md:text-5xl, font-bold
- **Subheadings**: text-xl md:text-2xl, font-semibold
- **Body**: text-base md:text-lg, line-height relaxed
- **CTAs**: text-lg font-semibold

## Page Structure

### Home Page (Single Scroll)

**Hero Section** (80vh min-height)
- Animated gradient background with particle effects
- Centered content with title + subtitle + dual CTAs
- Primary CTA: "🚀 Launch Zinobot on Telegram" (prominent, glowing)
- Secondary CTA: "💰 Buy Crypto with MoonPay" (outlined style)
- Background: Floating 3D crypto icons (SOL logo, Pepe elements)

**About Section** (full-width, py-24)
- Brief intro paragraph (max-w-3xl centered)
- Three-column grid of feature cards (grid-cols-1 md:grid-cols-3)
- Each card: icon, title, description with glowing border on hover
- Cards: "AI-Powered Signals", "Meme-Driven Community", "Built for Solana"

**Rewards Section** (py-24, gradient background)
- Headline + description of reward system
- Animated counter/progress bar showing total rewards
- Visual representation of earning mechanisms
- Subtle glow effects around metrics

**Referral Teaser** (py-20)
- Short description with visual icon
- "Learn More" CTA linking to /referral page
- Preview of referral benefits

**Get Started Section** (py-24)
- Three-step visual guide (numbered cards in row)
- Step 1: Buy SOL via MoonPay (icon + description)
- Step 2: Launch Zinobot (icon + description)  
- Step 3: Trade & Earn (icon + description)
- Animated icons with sequential reveal

**Footer** (py-12, border-top with glow)
- Navigation links centered
- Social links (Telegram, X/Twitter)
- Copyright notice

### /referral Page
- Hero with referral explanation (py-20)
- Animated flow graphic showing: Share → Friend Joins → Earn Rewards
- Benefits list with icons
- "Leaderboard Coming Soon" teaser card
- Launch Zinobot CTA
- Same footer as home

### /docs Page
- Two-column layout: sidebar (w-64) + content area
- Sidebar: sticky navigation with sections
- Content: markdown-style with code blocks
- Sections: Overview, Wallet Connection, MoonPay Guide, Bot Commands, API (coming soon)
- Syntax highlighting for code examples

## Component Library

**Buttons**
- Primary: Solid with glow effect, white text, hover scale
- Secondary: Outlined with glow, hover fill
- Blurred backgrounds when on images

**Cards**
- Rounded-2xl, backdrop-blur effect
- Glowing border (gradient or neon)
- Hover: subtle lift + increased glow
- Padding: p-6 to p-8

**Navigation**
- Fixed header on scroll
- Logo left, links center, CTA right (desktop)
- Mobile: hamburger menu

**MoonPay Integration**
- Modal/widget implementation
- Triggered by "Buy Crypto" button

## Animations
**Framer Motion**: All section transitions with fade-in + slide-up
- Hero: Staggered text reveal, particle system background
- Cards: Hover scale (1.02) with glow intensification
- Progress bars: Animated count-up on scroll into view
- Get Started steps: Sequential fade-in-up
- Glowing borders: Subtle pulse animation

**Performance**: Limit to essential animations, no unnecessary motion

## Images

**Hero Section**: 
Large background image or video loop showing abstract crypto/blockchain visualization with Solana and meme elements integrated. Should be dark-themed with purple/blue tones. Image should be full-screen with subtle parallax effect.

**About Cards**:
Icon-based graphics representing AI, community, and Solana - can be SVG illustrations with neon glow effects.

**Get Started Section**:
Step icons showing wallet, bot interface, and rewards - illustrated style matching brand aesthetic.

**Referral Page**:
Flow diagram graphic showing referral journey - custom illustration with connected nodes/arrows.

## Integrations
- Telegram deep link: https://t.me/Zinobot (opens in new tab)
- MoonPay widget: iframe modal overlay
- Animated Solana logo: SVG with glow animation

## Responsive Breakpoints
- Mobile: base (single column, stacked navigation)
- Tablet: md (2-column grids where applicable)
- Desktop: lg+ (full multi-column layouts)
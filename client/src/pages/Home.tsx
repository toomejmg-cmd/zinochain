import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PixelBlast from "@/components/PixelBlastFallback";
import { MagicCard } from "@/components/MagicCard";
import ElectricBorder from "@/components/ElectricBorder";
import StarBorder from "@/components/StarBorder";
import { GridScan } from "@/components/GridScan";
import { BubbleAnimation } from "@/components/BubbleAnimation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Rocket,
  TrendingUp,
  Brain,
  Users,
  Zap,
  Gift,
  ArrowRight,
  Bot,
  LineChart,
  Shield,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import heroLogo from "@assets/ChatGPT Image Nov 8, 2025, 08_36_07 AM_1762587458220.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-chart-2/20" />
        <div className="absolute inset-0">
          <GridScan
            linesColor="#B19EEF"
            scanColor="#FF9FFC"
            scanOpacity={0.6}
            gridScale={0.12}
            lineThickness={1.2}
            lineJitter={0.15}
            scanDirection="pingpong"
            scanDuration={3.0}
            scanDelay={1.5}
            scanGlow={0.8}
            scanSoftness={2.5}
            scanPhaseTaper={0.15}
            bloomIntensity={0.3}
            chromaticAberration={0.003}
            noiseIntensity={0.02}
            className="opacity-60"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="flex justify-center mb-8"
          >
            <div className="p-6 bg-primary/10 rounded-full border border-primary/30 glow-border">
              <img 
                src={heroLogo} 
                alt="Zinochain" 
                className="h-16 w-16 object-contain spinning-logo"
                data-testid="img-hero-logo"
              />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            data-testid="text-hero-title"
          >
            <span className="gradient-text">Welcome to Zinochain Bot</span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-semibold mb-4 text-foreground"
            data-testid="text-hero-subtitle"
          >
            Your AI-Powered Multi-Chain Trading Companion
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
            data-testid="text-hero-description"
          >
            Trade seamlessly across Solana, Ethereum, and BSC with AI-powered insights, secure multi-chain wallets, and automated trading strategies—all from your Telegram.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="gradient-bg text-lg px-8 py-6 border-primary-border"
              asChild
              data-testid="button-launch-bot"
            >
              <a
                href="https://t.me/zinochainbot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Trading on Telegram
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
              asChild
              data-testid="button-join-community"
            >
              <a
                href="https://t.me/zinochainbot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Community
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="relative py-20 md:py-32 bg-card/30 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <PixelBlast
            variant="square"
            pixelSize={8}
            color="#60A5FA"
            patternScale={2}
            patternDensity={0.6}
            pixelSizeJitter={0.3}
            enableRipples={false}
            speed={0.2}
            edgeFade={0.4}
            transparent
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-6"
              data-testid="text-about-title"
            >
              About <span className="gradient-text">Zinochain Bot</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-about-description"
            >
              Zinochain Bot is an AI-powered multi-chain trading ecosystem designed for the
              next generation of crypto traders. Trade seamlessly across Solana, Ethereum, and BSC
              with cutting-edge AI signals and secure non-custodial wallets.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Brain,
                title: "Multi-Chain Token Swaps",
                description:
                  "Swap tokens seamlessly across Solana, Ethereum, and BSC with optimal routing. Get the best prices without leaving Telegram.",
              },
              {
                icon: Users,
                title: "Cross-Chain Portfolio Tracking",
                description:
                  "Monitor your holdings across all chains in one place. View balances, track performance, and manage your multi-chain portfolio effortlessly.",
              },
              {
                icon: Zap,
                title: "P2P Transfers on All Chains",
                description:
                  "Send and receive crypto instantly on Solana, Ethereum, and BSC. Enjoy lightning-fast P2P transfers with AES-256 encrypted wallets.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <ElectricBorder
                  color="#B19EEF"
                  speed={1}
                  chaos={1}
                  thickness={2}
                >
                  <MagicCard
                    enableParticles={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    enableClickRipple={true}
                    enableGlow={true}
                    particleCount={8}
                    glowColor="177, 158, 239"
                  >
                    <Card className="p-8 h-full hover-elevate" data-testid={`card-feature-${index}`}>
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-primary/10 rounded-full border border-primary/30">
                          <feature.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold" data-testid={`text-feature-title-${index}`}>
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                          {feature.description}
                        </p>
                      </div>
                    </Card>
                  </MagicCard>
                </ElectricBorder>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative py-20 md:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <PixelBlast
            variant="triangle"
            pixelSize={5}
            color="#A78BFA"
            patternScale={2.5}
            patternDensity={0.9}
            pixelSizeJitter={0.4}
            enableRipples
            rippleSpeed={0.3}
            rippleThickness={0.15}
            rippleIntensityScale={1.2}
            speed={0.4}
            edgeFade={0.35}
            transparent
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-features-title">
              Why Choose <span className="gradient-text">Zinochain Bot</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-features-description">
              Discover the powerful features that make Zinochain Bot your ultimate multi-chain trading companion
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              className="lg:row-span-3 rounded-lg border-2 border-[#a8e063] bg-card/50 backdrop-blur-sm shadow-[0_0_15px_rgba(168,224,99,0.3)]"
              data-testid="card-stack-ai"
            >
              <div className="flex flex-col items-center gap-8 p-12 h-full justify-center">
                <div className="p-8 bg-primary/10 rounded-2xl border border-primary/30">
                  <Bot className="h-20 w-20 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold mb-4 gradient-text" data-testid="card-stack-ai-title">
                    AI-Powered Multi-Chain Trading
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="card-stack-ai-description">
                    Zinochain Bot uses advanced AI algorithms to analyze market trends across Solana, Ethereum, and BSC. Execute trades 24/7 with optimal routing and never miss an opportunity.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="rounded-lg border-2 border-[#a8e063] bg-card/50 backdrop-blur-sm shadow-[0_0_15px_rgba(168,224,99,0.3)]"
              data-testid="card-stack-signals"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                <div className="p-6 bg-chart-2/10 rounded-2xl border border-chart-2/30 flex-shrink-0">
                  <LineChart className="h-12 w-12 text-chart-2" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 gradient-text" data-testid="card-stack-signals-title">
                    Cross-Chain Market Signals
                  </h3>
                  <p className="text-base text-muted-foreground" data-testid="card-stack-signals-description">
                    Receive instant alerts on profitable trades, price movements, and opportunities across all supported chains.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="rounded-lg border-2 border-[#a8e063] bg-card/50 backdrop-blur-sm shadow-[0_0_15px_rgba(168,224,99,0.3)]"
              data-testid="card-stack-security"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                <div className="p-6 bg-chart-3/10 rounded-2xl border border-chart-3/30 flex-shrink-0">
                  <Shield className="h-12 w-12 text-chart-3" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 gradient-text" data-testid="card-stack-security-title">
                    Secure & Non-Custodial
                  </h3>
                  <p className="text-base text-muted-foreground" data-testid="card-stack-security-description">
                    Your funds stay in your multi-chain wallet with AES-256 encryption. Trade with confidence across all chains.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="rounded-lg border-2 border-[#a8e063] bg-card/50 backdrop-blur-sm shadow-[0_0_15px_rgba(168,224,99,0.3)]"
              data-testid="card-stack-easy"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                <div className="p-6 bg-chart-4/10 rounded-2xl border border-chart-4/30 flex-shrink-0">
                  <Sparkles className="h-12 w-12 text-chart-4" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 gradient-text" data-testid="card-stack-easy-title">
                    Easy to Use
                  </h3>
                  <p className="text-base text-muted-foreground" data-testid="card-stack-easy-description">
                    Start trading in seconds with simple commands. Just chat with Zinochain Bot on Telegram.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rewards" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-secondary opacity-10" />
        <div className="absolute inset-0">
          <BubbleAnimation
            count={25}
            color="#FBBF24"
            minSize={30}
            maxSize={120}
            speed={0.8}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <div className="p-6 bg-chart-3/10 rounded-full border border-chart-3/30">
                <Gift className="h-16 w-16 text-chart-3" />
              </div>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-6"
              data-testid="text-rewards-title"
            >
              Earn <span className="gradient-text">Rewards</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
              data-testid="text-rewards-description"
            >
              Earn rewards based on trading volume, referrals, and community
              activity. The more you trade and engage, the more you earn.
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-12">
              <MagicCard
                enableParticles={true}
                enableTilt={true}
                enableMagnetism={true}
                enableClickRipple={true}
                enableGlow={true}
                particleCount={15}
                glowColor="251, 191, 36"
              >
                <Card className="p-12 max-w-2xl mx-auto glow-border bg-card/80 backdrop-blur-sm">
                  <div className="text-6xl md:text-8xl font-bold gradient-text mb-4" data-testid="text-rewards-counter">
                    $1,234,567
                  </div>
                  <p className="text-lg text-muted-foreground" data-testid="text-rewards-distributed">
                    Total Rewards Distributed
                  </p>
                </Card>
              </MagicCard>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { label: "Trading Volume", icon: TrendingUp },
                { label: "Referrals", icon: Users },
                { label: "Community Activity", icon: Zap },
              ].map((item, index) => (
                <MagicCard
                  key={index}
                  enableParticles={true}
                  enableTilt={true}
                  enableMagnetism={false}
                  enableClickRipple={true}
                  enableGlow={true}
                  particleCount={6}
                  glowColor="251, 191, 36"
                >
                  <Card
                    className="p-6 hover-elevate bg-card/50 backdrop-blur-sm"
                    data-testid={`card-reward-type-${index}`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold" data-testid={`text-reward-type-${index}`}>{item.label}</span>
                    </div>
                  </Card>
                </MagicCard>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="referral-teaser" className="relative py-20 md:py-32 bg-card/30 overflow-hidden">
        <div className="absolute inset-0 opacity-18">
          <PixelBlast
            variant="circle"
            pixelSize={7}
            color="#34D399"
            patternScale={2.8}
            patternDensity={1}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.35}
            rippleThickness={0.14}
            rippleIntensityScale={1.3}
            liquid
            liquidStrength={0.1}
            liquidRadius={1}
            liquidWobbleSpeed={4.5}
            speed={0.5}
            edgeFade={0.3}
            transparent
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-6"
              data-testid="text-referral-teaser-title"
            >
              Invite Friends, <span className="gradient-text">Earn SOL</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              data-testid="text-referral-teaser-description"
            >
              Share your referral link and earn rewards when your friends start
              trading with Zinochain Bot across all supported chains.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 glow-border"
                asChild
                data-testid="button-learn-more"
              >
                <a href="/referral">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="get-started" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-12">
          <PixelBlast
            variant="square"
            pixelSize={10}
            color="#F472B6"
            patternScale={1.8}
            patternDensity={0.5}
            pixelSizeJitter={0.2}
            enableRipples={false}
            speed={0.15}
            edgeFade={0.45}
            transparent
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              data-testid="text-get-started-title"
            >
              Get Started in <span className="gradient-text">3 Easy Steps</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Bot,
                  title: "Start Zinochain Bot on Telegram",
                  description:
                    "Open @zinochainbot on Telegram to access the AI-powered multi-chain trading platform.",
                },
                {
                  step: "02",
                  icon: Rocket,
                  title: "Connect Your Multi-Chain Wallet",
                  description:
                    "Link your multi-chain wallet directly through the Telegram bot to start trading on Solana, Ethereum, and BSC.",
                },
                {
                  step: "03",
                  icon: TrendingUp,
                  title: "Trade Across All Chains",
                  description:
                    "Execute trades on Solana, Ethereum, and BSC with AI-powered insights and earn rewards based on your activity.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <MagicCard
                    enableParticles={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    enableClickRipple={true}
                    enableGlow={true}
                    particleCount={10}
                    glowColor="244, 114, 182"
                  >
                    <Card className="p-8 h-full hover-elevate bg-card/50 backdrop-blur-sm" data-testid={`card-step-${index}`}>
                      <div className="absolute -top-6 -left-6 text-8xl font-bold text-primary/10">
                        {step.step}
                      </div>
                      <div className="relative space-y-4">
                        <div className="p-4 bg-primary/10 rounded-full border border-primary/30 inline-block">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold" data-testid={`text-step-title-${index}`}>
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-step-description-${index}`}>
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

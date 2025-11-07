import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PixelBlast from "@/components/PixelBlastFallback";
import { MagicCard } from "@/components/MagicCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Rocket,
  Wallet,
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
} from "lucide-react";
import { SiSolana } from "react-icons/si";
import { useState } from "react";

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
  const [showMoonPay, setShowMoonPay] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-chart-2/20" />
        <div className="absolute inset-0 opacity-40">
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#B19EEF"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
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
              <SiSolana className="h-16 w-16 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            data-testid="text-hero-title"
          >
            <span className="gradient-text">Zinochain</span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-semibold mb-4 text-foreground"
            data-testid="text-hero-subtitle"
          >
            AI-Powered Solana Trading
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
            data-testid="text-hero-description"
          >
            Meet Zinobot, the meme-fueled Solana trader powered by AI and community
            hype.
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
                Launch Zinobot on Telegram
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
              onClick={() => setShowMoonPay(true)}
              data-testid="button-buy-crypto"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Buy Crypto with MoonPay
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
              About <span className="gradient-text">Zinochain</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-about-description"
            >
              Zinochain is an AI-powered Solana trading ecosystem designed for the
              next generation of crypto traders. Zinobot trades exclusively on the
              Solana network, combining cutting-edge AI signals with community-driven
              meme culture.
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
                title: "AI-Powered Signals",
                description:
                  "Advanced machine learning algorithms analyze market trends and provide real-time trading signals for optimal entry and exit points.",
              },
              {
                icon: Users,
                title: "Meme-Driven Community",
                description:
                  "Join a vibrant community of traders who combine serious trading with meme culture. Make profits while having fun.",
              },
              {
                icon: SiSolana,
                title: "Built for Solana",
                description:
                  "Lightning-fast transactions and minimal fees on the Solana blockchain. Trade at the speed of light.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <MagicCard
                  enableParticles={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  enableClickRipple={true}
                  enableGlow={true}
                  particleCount={8}
                  glowColor="177, 158, 239"
                >
                  <Card className="p-8 h-full hover-elevate glow-border bg-card/50 backdrop-blur-sm" data-testid={`card-feature-${index}`}>
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
              Why Choose <span className="gradient-text">Zinobot</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-features-description">
              Discover the powerful features that make Zinobot your ultimate trading companion
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="p-12 bg-background border border-border rounded-lg" data-testid="card-stack-ai">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="p-8 bg-primary/10 rounded-2xl border border-primary/30">
                  <Bot className="h-16 w-16 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4 gradient-text" data-testid="card-stack-ai-title">
                    AI-Powered Trading Bot
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="card-stack-ai-description">
                    Zinobot uses advanced AI algorithms to analyze market trends, identify profitable opportunities, and execute trades 24/7. Get real-time signals and never miss a trade again.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 bg-background border border-border rounded-lg" data-testid="card-stack-signals">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="p-8 bg-chart-2/10 rounded-2xl border border-chart-2/30">
                  <LineChart className="h-16 w-16 text-chart-2" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4 gradient-text" data-testid="card-stack-signals-title">
                    Real-Time Market Signals
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="card-stack-signals-description">
                    Receive instant alerts on profitable trades, price movements, and market opportunities. Our AI continuously monitors the Solana ecosystem to keep you ahead of the curve.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 bg-background border border-border rounded-lg" data-testid="card-stack-security">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="p-8 bg-chart-3/10 rounded-2xl border border-chart-3/30">
                  <Shield className="h-16 w-16 text-chart-3" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4 gradient-text" data-testid="card-stack-security-title">
                    Secure & Non-Custodial
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="card-stack-security-description">
                    Your funds stay in your wallet. Zinobot never has access to your private keys. Trade with confidence knowing your assets are always under your control.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 bg-background border border-border rounded-lg" data-testid="card-stack-easy">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="p-8 bg-chart-4/10 rounded-2xl border border-chart-4/30">
                  <Sparkles className="h-16 w-16 text-chart-4" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4 gradient-text" data-testid="card-stack-easy-title">
                    Easy to Use
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="card-stack-easy-description">
                    Start trading in seconds with simple commands. No complex interfaces or confusing dashboards - just chat with Zinobot on Telegram and let the AI do the heavy lifting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rewards" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-secondary opacity-10" />
        <div className="absolute inset-0 opacity-25">
          <PixelBlast
            variant="diamond"
            pixelSize={4}
            color="#FBBF24"
            patternScale={3.5}
            patternDensity={1.3}
            pixelSizeJitter={0.6}
            enableRipples
            rippleSpeed={0.5}
            rippleThickness={0.1}
            rippleIntensityScale={2}
            liquid
            liquidStrength={0.08}
            liquidRadius={0.8}
            liquidWobbleSpeed={6}
            speed={0.7}
            edgeFade={0.2}
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
              Share your referral link and earn SOL rewards when your friends start
              trading with Zinobot.
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
                  icon: Wallet,
                  title: "Buy SOL via MoonPay",
                  description:
                    "Purchase Solana tokens easily using MoonPay with your credit card or bank transfer.",
                },
                {
                  step: "02",
                  icon: Rocket,
                  title: "Launch Zinobot on Telegram",
                  description:
                    "Open Zinobot in Telegram and connect your Solana wallet to get started.",
                },
                {
                  step: "03",
                  icon: TrendingUp,
                  title: "Trade and Earn Rewards",
                  description:
                    "Start trading with AI-powered signals and earn rewards based on your activity.",
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

      {showMoonPay && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowMoonPay(false)}
        >
          <div
            className="bg-card rounded-lg border border-border p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">MoonPay Integration</h3>
            <p className="text-muted-foreground mb-6">
              MoonPay widget integration would be embedded here. Visit{" "}
              <a
                href="https://www.moonpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                moonpay.com
              </a>{" "}
              to purchase SOL.
            </p>
            <Button
              onClick={() => setShowMoonPay(false)}
              className="w-full"
              data-testid="button-close-moonpay"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

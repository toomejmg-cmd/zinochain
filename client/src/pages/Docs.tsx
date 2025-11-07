import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Wallet,
  CreditCard,
  Bot,
  Code,
  ChevronRight,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen },
    { id: "wallet", title: "Connect Wallet", icon: Wallet },
    { id: "moonpay", title: "MoonPay Guide", icon: CreditCard },
    { id: "commands", title: "Bot Commands", icon: Bot },
    { id: "api", title: "API (Coming Soon)", icon: Code },
  ];

  const content: Record<string, { title: string; content: JSX.Element }> = {
    overview: {
      title: "Overview of Zinochain Ecosystem",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-overview-intro">
            Zinochain is an AI-powered Solana trading ecosystem that combines
            cutting-edge technology with community-driven meme culture. Our flagship
            product, Zinobot, is a Telegram bot that provides real-time trading
            signals and automated trading capabilities on the Solana blockchain.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-key-features-heading">Key Features</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2" data-testid="text-feature-ai-signals">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">AI-Powered Signals:</strong>{" "}
                  Advanced machine learning algorithms analyze market trends in
                  real-time
                </span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-feature-solana-native">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Solana-Native:</strong>{" "}
                  Lightning-fast transactions with minimal fees
                </span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-feature-rewards">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Rewards System:</strong> Earn
                  based on trading volume, referrals, and community activity
                </span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-feature-community">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Community-Driven:</strong> Join
                  a vibrant ecosystem of traders and meme enthusiasts
                </span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
    wallet: {
      title: "How to Connect Your Solana Wallet",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-wallet-intro">
            Connecting your Solana wallet to Zinobot is quick and secure. Follow
            these steps to get started:
          </p>

          <div className="space-y-4">
            <Card className="p-6 bg-card/50" data-testid="card-wallet-step-1">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-1-title">Launch Zinobot</h3>
                  <p className="text-muted-foreground" data-testid="text-wallet-step-1-description">
                    Open{" "}
                    <a
                      href="https://t.me/zinochainbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-wallet-telegram"
                    >
                      Zinobot on Telegram
                    </a>{" "}
                    and start a conversation with the bot.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50" data-testid="card-wallet-step-2">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-2-title">Use the /connect Command</h3>
                  <p className="text-muted-foreground mb-3" data-testid="text-wallet-step-2-description">
                    Type <code className="px-2 py-1 bg-muted rounded text-sm">/connect</code>{" "}
                    to initiate the wallet connection process.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50" data-testid="card-wallet-step-3">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-3-title">Choose Your Wallet</h3>
                  <p className="text-muted-foreground" data-testid="text-wallet-step-3-description">
                    Select your preferred Solana wallet (Phantom, Solflare, etc.) and
                    follow the prompts to authorize the connection.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50" data-testid="card-wallet-step-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-4-title">Confirm Connection</h3>
                  <p className="text-muted-foreground" data-testid="text-wallet-step-4-description">
                    Once connected, you'll receive a confirmation message and can start
                    trading immediately.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    moonpay: {
      title: "MoonPay Integration Guide",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-moonpay-intro">
            MoonPay allows you to purchase SOL tokens directly with your credit card or
            bank transfer. Here's how to use it:
          </p>

          <Card className="p-6 bg-card/50" data-testid="card-moonpay-purchasing">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-moonpay-purchasing-title">Purchasing SOL</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-3" data-testid="text-moonpay-step-1">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/30 text-sm flex-shrink-0">
                  1
                </span>
                <span className="text-muted-foreground">
                  Click the "Buy Crypto with MoonPay" button on our homepage
                </span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-moonpay-step-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/30 text-sm flex-shrink-0">
                  2
                </span>
                <span className="text-muted-foreground">
                  Enter the amount of SOL you want to purchase
                </span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-moonpay-step-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/30 text-sm flex-shrink-0">
                  3
                </span>
                <span className="text-muted-foreground">
                  Enter your Solana wallet address (from your connected wallet)
                </span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-moonpay-step-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/30 text-sm flex-shrink-0">
                  4
                </span>
                <span className="text-muted-foreground">
                  Complete the payment using your preferred method
                </span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-moonpay-step-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/30 text-sm flex-shrink-0">
                  5
                </span>
                <span className="text-muted-foreground">
                  SOL will be deposited directly into your wallet within minutes
                </span>
              </li>
            </ol>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/30" data-testid="card-moonpay-payment-methods">
            <h4 className="font-semibold mb-2 flex items-center gap-2" data-testid="text-moonpay-payment-methods-title">
              <ChevronRight className="h-5 w-5 text-primary" />
              Supported Payment Methods
            </h4>
            <ul className="ml-7 space-y-1 text-muted-foreground">
              <li data-testid="text-payment-method-cards">Credit/Debit Cards (Visa, Mastercard)</li>
              <li data-testid="text-payment-method-bank">Bank Transfers</li>
              <li data-testid="text-payment-method-digital">Apple Pay & Google Pay</li>
            </ul>
          </Card>
        </div>
      ),
    },
    commands: {
      title: "Zinobot Commands",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-commands-intro">
            Zinobot supports various commands to help you trade, manage your account,
            and access features. Here are the essential commands:
          </p>

          <div className="space-y-3">
            {[
              {
                cmd: "/start",
                desc: "Initialize the bot and see the welcome message",
              },
              {
                cmd: "/connect",
                desc: "Connect your Solana wallet to Zinobot",
              },
              {
                cmd: "/balance",
                desc: "Check your SOL balance and Zino points",
              },
              {
                cmd: "/trade",
                desc: "View current trading signals and execute trades",
              },
              {
                cmd: "/refer",
                desc: "Get your referral link and view referral stats",
              },
              {
                cmd: "/rewards",
                desc: "View your earned rewards and claim them",
              },
              {
                cmd: "/settings",
                desc: "Customize bot preferences and notifications",
              },
              {
                cmd: "/help",
                desc: "Get help and see all available commands",
              },
            ].map((command, index) => (
              <Card key={index} className="p-4 bg-card/50 hover-elevate" data-testid={`card-command-${index}`}>
                <div className="flex items-start gap-4">
                  <code className="px-3 py-1.5 bg-muted rounded text-sm font-mono flex-shrink-0" data-testid={`text-command-name-${index}`}>
                    {command.cmd}
                  </code>
                  <p className="text-muted-foreground pt-1" data-testid={`text-command-description-${index}`}>{command.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    api: {
      title: "API Documentation (Coming Soon)",
      content: (
        <div className="space-y-6">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/30" data-testid="card-api-coming-soon">
            <Code className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4" data-testid="text-api-coming-soon-title">API Documentation</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-api-coming-soon-description">
              We're working on comprehensive API documentation to help developers
              integrate Zinochain services into their applications. Stay tuned for
              updates!
            </p>
          </Card>

          <Card className="p-6 bg-card/50" data-testid="card-api-planned-features">
            <h4 className="font-semibold mb-3" data-testid="text-api-planned-features-title">Planned API Features</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2" data-testid="text-api-feature-signals">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Real-time trading signals and market data</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-api-feature-referrals">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Referral tracking and management</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-api-feature-rewards">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Rewards and points balance queries</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-api-feature-webhooks">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Webhook support for custom integrations</span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full pt-16">
          <Sidebar>
            <SidebarContent className="pt-8">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sections.map((section) => (
                      <SidebarMenuItem key={section.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(section.id)}
                          isActive={activeSection === section.id}
                          data-testid={`button-section-${section.id}`}
                        >
                          <section.icon className="h-4 w-4" />
                          <span>{section.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="mb-12"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-docs-title">
                    <span className="gradient-text">Documentation</span>
                  </h1>
                  <p className="text-lg text-muted-foreground" data-testid="text-docs-subtitle">
                    Everything you need to know about using Zinochain and Zinobot
                  </p>
                </motion.div>

                <motion.div
                  key={activeSection}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <Card className="p-8 bg-card/50 backdrop-blur-sm" data-testid={`content-${activeSection}`}>
                    <h2 className="text-3xl font-bold mb-6" data-testid={`text-section-title-${activeSection}`}>
                      {content[activeSection].title}
                    </h2>
                    {content[activeSection].content}
                  </Card>
                </motion.div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}

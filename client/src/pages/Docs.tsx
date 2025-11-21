import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Wallet,
  CreditCard,
  Bot,
  Code,
  ChevronRight,
  Zap,
  Lock,
  TrendingUp,
  ChevronLeft,
  Menu,
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
  const [showMenu, setShowMenu] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.scrollTop = 0;
        }
      });
    }
  }, [activeSection]);

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen },
    { id: "multichain", title: "Multi-Chain Support", icon: Wallet },
    { id: "trading", title: "Token Trading", icon: CreditCard },
    { id: "portfolio", title: "Portfolio Tracking", icon: TrendingUp },
    { id: "advanced", title: "Advanced Features", icon: Zap },
    { id: "wallet", title: "Connect Wallet", icon: Wallet },
    { id: "security", title: "Security", icon: Lock },
    { id: "commands", title: "Bot Commands", icon: Bot },
  ];

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const content: Record<string, { title: string; content: JSX.Element }> = {
    overview: {
      title: "Overview of Zinochain Bot",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-overview-intro">
            Zinochain Bot is an AI-powered multi-chain trading ecosystem that combines
            cutting-edge technology with seamless cross-chain capabilities. Our flagship
            product is a Telegram bot that provides real-time trading signals and automated
            trading across Solana, Ethereum, and BSC.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-key-features-heading">Key Features</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2" data-testid="text-feature-ai-signals">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Multi-Chain Trading:</strong>{" "}
                  Trade seamlessly across Solana, Ethereum, and BSC with optimal routing
                </span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-feature-solana-native">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">AI-Powered Signals:</strong>{" "}
                  Advanced algorithms analyze market trends across all supported chains
                </span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-feature-rewards">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Secure Wallets:</strong> AES-256
                  encrypted non-custodial wallets for all chains
                </span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-feature-community">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Referral Rewards:</strong> Earn
                  rewards when your friends trade across all supported chains
                </span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
    multichain: {
      title: "Multi-Chain Support",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-multichain-intro">
            Zinochain Bot supports trading across three major blockchain networks,
            giving you access to thousands of tokens and the best liquidity across
            the crypto ecosystem.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-supported-chains-heading">Supported Chains</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2" data-testid="text-chain-solana">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Solana</strong>
                  <p className="mt-1">Lightning-fast transactions with minimal fees. Perfect for high-frequency trading and meme tokens.</p>
                </div>
              </li>
              <li className="flex items-start gap-2" data-testid="text-chain-ethereum">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Ethereum</strong>
                  <p className="mt-1">Access the largest DeFi ecosystem with the deepest liquidity and most established tokens.</p>
                </div>
              </li>
              <li className="flex items-start gap-2" data-testid="text-chain-bsc">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Binance Smart Chain (BSC)</strong>
                  <p className="mt-1">Low-cost transactions with fast confirmation times and a vibrant trading community.</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4">Switching Between Chains</h3>
            <p className="text-muted-foreground mb-4">
              Easily switch between chains using the <code className="px-2 py-1 bg-muted rounded text-sm">/chain</code> command in the bot:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <code className="text-sm">/chain solana</code> - Switch to Solana
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <code className="text-sm">/chain ethereum</code> - Switch to Ethereum
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <code className="text-sm">/chain bsc</code> - Switch to BSC
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
    wallet: {
      title: "How to Connect Your Multi-Chain Wallet",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-wallet-intro">
            Connecting your multi-chain wallet to Zinochain Bot is quick and secure. The bot
            creates AES-256 encrypted wallets for you across all supported chains.
          </p>

          <div className="space-y-4">
            <Card className="p-6 bg-card/50" data-testid="card-wallet-step-1">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex-shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-1-title">Launch Zinochain Bot</h3>
                  <p className="text-muted-foreground" data-testid="text-wallet-step-1-description">
                    Open{" "}
                    <a
                      href="https://t.me/zinochainbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-wallet-telegram"
                    >
                      Zinochain Bot on Telegram
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
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-2-title">Create Your Wallet</h3>
                  <p className="text-muted-foreground mb-3" data-testid="text-wallet-step-2-description">
                    Type <code className="px-2 py-1 bg-muted rounded text-sm">/start</code>{" "}
                    and the bot will automatically create secure, encrypted wallets for Solana, Ethereum, and BSC.
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
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-3-title">Backup Your Keys</h3>
                  <p className="text-muted-foreground" data-testid="text-wallet-step-3-description">
                    Save your private keys securely. The bot will provide encrypted backups for each chain.
                    Never share your private keys with anyone.
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
                  <h3 className="font-semibold mb-2" data-testid="text-wallet-step-4-title">Start Trading</h3>
                  <p className="text-muted-foreground" data-testid="text-wallet-step-4-description">
                    Once your wallets are created, you can start trading immediately across Solana, Ethereum, and BSC.
                    Use <code className="px-2 py-1 bg-muted rounded text-sm">/balance</code> to view your holdings.
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
      title: "Bot Commands",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-commands-intro">
            Zinochain Bot supports various commands to help you trade, manage your account,
            and access features across all supported chains. Here are the essential commands:
          </p>

          <div className="space-y-3">
            {[
              {
                cmd: "/start",
                desc: "Initialize the bot and create your multi-chain wallets",
              },
              {
                cmd: "/chain",
                desc: "Switch between Solana, Ethereum, and BSC networks",
              },
              {
                cmd: "/balance",
                desc: "Check your balances across all chains",
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
    trading: {
      title: "Token Trading",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-trading-intro">
            Zinochain Bot provides a comprehensive token trading experience with advanced features across all supported blockchains.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-trading-features-heading">Trading Capabilities</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2" data-testid="text-trading-feature-buy">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Buy Tokens:</strong> Swap native coins (SOL/ETH/BNB) for any token instantly</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-trading-feature-sell">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Sell Tokens:</strong> Convert tokens back to native coins with optimal routing</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-trading-feature-custom-input">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Custom Token Input:</strong> Enter token addresses, tickers, or URLs (Pump.fun, Birdeye, DEX Screener)</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-trading-feature-slippage">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Slippage Control:</strong> Adjust tolerance from 0.01% to 50% for volatile pairs</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-trading-feature-fees">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Priority Fees:</strong> Configure transaction priority (Auto, Low, Standard, High)</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-trading-feature-routing">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Best-Price Routing:</strong> Jupiter Aggregator on Solana, OneInch on Ethereum & BSC</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-trading-fee-heading">Fee System</h3>
            <p className="text-muted-foreground mb-4" data-testid="text-trading-fee-desc">All fees are transparent and displayed before every trade execution.</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Default 0.5% per transaction (configurable by admins)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Automated fee collection to designated wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Zero hidden fees - all costs shown upfront</span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
    portfolio: {
      title: "Portfolio Tracking",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-portfolio-intro">
            Real-time multi-chain portfolio monitoring with complete visibility into your holdings and transaction history.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-portfolio-features-heading">Portfolio Features</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2" data-testid="text-portfolio-feature-balance">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Balance Overview:</strong> View SOL, ETH, BNB, and all SPL/ERC-20/BEP-20 token balances</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-portfolio-feature-conversion">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">USD Conversion:</strong> Real-time pricing via CoinGecko API</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-portfolio-feature-history">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Transaction History:</strong> Complete audit trail with timestamps, amounts, and gas fees</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-portfolio-feature-explorer-links">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Block Explorer Links:</strong> Direct links to Solscan, Etherscan, and BSCScan</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-portfolio-feature-management">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Token Management:</strong> Hide tokens below minimum value threshold</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-portfolio-feature-watchlist">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Watchlist:</strong> Add and track specific tokens for monitoring</span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
    advanced: {
      title: "Advanced Trading Features",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-advanced-intro">
            Sophisticated trading tools for experienced traders looking to optimize their strategies across all supported chains.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-advanced-limit-heading">Limit Orders</h3>
            <p className="text-muted-foreground mb-3">Set buy/sell orders that execute automatically when your target price is reached.</p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Define exact buy/sell prices</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>View, edit, and cancel active orders</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Bot monitors 24/7 for target prices</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-advanced-dca-heading">DCA (Dollar Cost Averaging)</h3>
            <p className="text-muted-foreground mb-3">Perfect for long-term investment strategies with automatic periodic purchases.</p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Daily, weekly, or custom purchase schedules</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Define purchase amount per interval</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Reduce entry price volatility over time</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-advanced-snipe-heading">Token Sniping</h3>
            <p className="text-muted-foreground mb-3">Catch early-stage tokens at launch with millisecond execution.</p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Monitor tokens at launch</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>MEV protection to minimize sandwich attacks</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Get alerted on price movements instantly</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-advanced-alerts-heading">Price Alerts</h3>
            <p className="text-muted-foreground mb-3">Stay informed 24/7 with custom price targets and instant notifications.</p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Track unlimited tokens simultaneously</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Alert on price highs or lows</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Instant Telegram notifications</span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
    security: {
      title: "Security & Wallet Management",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground" data-testid="text-security-intro">
            Bank-grade security with AES-256 encryption and non-custodial wallet management. You control your keys, not Zinochain.
          </p>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-security-encryption-heading">Encryption & Data Protection</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">AES-256-GCM:</strong> Military-grade encryption for private keys</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">At-Rest Encryption:</strong> Keys encrypted in database storage</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">HTTPS Only:</strong> All communications encrypted in transit</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Rate Limiting:</strong> Protection against brute force attacks</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-security-wallet-heading">Wallet Security</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Non-Custodial:</strong> You control private keys, not Zinochain</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">One-Time Seed Display:</strong> Private keys shown only once during creation</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Import Wallets:</strong> Import existing wallets using BIP39 seed phrases</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Multiple Wallets:</strong> Manage up to 5 wallets per user</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary" data-testid="text-security-transaction-heading">Transaction Security</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">MEV Protection:</strong> Minimize sandwich attacks (configurable)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Slippage Limits:</strong> User-defined price protection</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Manual Approval:</strong> Optional confirmation for all transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Gas Monitoring:</strong> Alerts on high gas prices</span>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Menu Bar - 3 Lines */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground font-medium transition-all border border-primary/30"
            data-testid="button-menu-toggle"
          >
            <Menu className="h-5 w-5" />
            <span>{sections.find((s) => s.id === activeSection)?.title || "Documentation Sections"}</span>
          </button>

          {/* Menu Dropdown */}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setShowMenu(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  data-testid={`button-section-${section.id}`}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="truncate">{section.title}</span>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto" ref={mainRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
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
              Everything you need to know about using Zinochain Bot
            </p>
          </motion.div>

          <motion.div
            key={activeSection}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm mb-12" data-testid={`content-${activeSection}`}>
              <h2 className="text-3xl font-bold mb-6" data-testid={`text-section-title-${activeSection}`}>
                {content[activeSection].title}
              </h2>
              {content[activeSection].content}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 mt-12">
              {prevSection ? (
                <Button
                  onClick={() => {
                    setActiveSection(prevSection.id);
                    setShowMenu(false);
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                  data-testid="button-nav-prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="text-sm font-medium">{prevSection.title}</div>
                  </div>
                </Button>
              ) : (
                <div />
              )}

              {nextSection ? (
                <Button
                  onClick={() => {
                    setActiveSection(nextSection.id);
                    setShowMenu(false);
                  }}
                  variant="outline"
                  className="flex items-center gap-2 ml-auto"
                  data-testid="button-nav-next"
                >
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="text-sm font-medium">{nextSection.title}</div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

export default function BeginersGuide() {
  const sections = [
    { id: "step1", title: "Step 1: Start the Bot (2 minutes)", content: "Open Telegram, search for @Zinochainbot, and click \"Start\" or send /start. Choose your blockchain (Solana recommended for beginners - fastest and cheapest)." },
    { id: "step2", title: "Step 2: Create Your First Wallet (3 minutes)", content: "The bot will generate a secure wallet and show your seed phrase (12-24 words) ONE TIME ONLY. WRITE DOWN your seed phrase on paper - this is your backup key. Your private key is encrypted with AES-256 (bank-grade security)." },
    { id: "step3", title: "Step 3: Fund Your Wallet (5-10 minutes)", content: "Option A: Buy with Credit Card - Use Moonpay integration to buy SOL or USDC. Option B: Send from another wallet - Transfer SOL from Coinbase, Binance, or Kraken to your Zinochain address. Costs minimal fees (~3-5% with Moonpay)." },
    { id: "step4", title: "Step 4: Check Your Balance (1 minute)", content: "Click 👛 Wallet to view your SOL balance. Once crypto arrives (5-10 minutes), you're ready to trade!" },
    { id: "step5", title: "Step 5: Make Your First Trade (3 minutes)", content: "Click 💰 Buy, search for a token (try USDC first - it's safe), enter amount in SOL (start small: 0.05 SOL = ~$1), review the fee (0.5%), and click ✅ Buy Now. Wait 10-30 seconds for confirmation." },
    { id: "step6", title: "Step 6: Sell Your Tokens", content: "Click 💸 Sell, select the token to sell, enter amount or click \"Sell All\", review details, and confirm. Your SOL will be returned to your wallet instantly." },
  ];

  const features = [
    { title: "Multi-Chain Trading", description: "Trade seamlessly on Solana, Ethereum, and BSC from one dashboard" },
    { title: "Non-Custodial Wallets", description: "You control your private keys with AES-256 encryption - bank-grade security" },
    { title: "Quick Wallet Setup", description: "Create a secure wallet in seconds without leaving Telegram" },
    { title: "Low Fees", description: "0.5% trading fee plus minimal network fees ($0.01-0.05)" },
    { title: "Advanced Features", description: "Limit orders, price alerts, DCA, and token sniping once you're comfortable" },
    { title: "Referral Rewards", description: "Earn 25% cashback + commissions from friends (paid every 12 hours)" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-guide-title">
              <span className="gradient-text">Beginner's Trading Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-guide-intro">
              Your complete step-by-step guide to start trading with Zinochain Bot. No crypto experience needed!
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={1}
            className="mb-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6" data-testid="text-guide-steps-title">Your Trading Journey in 6 Steps</h2>
            <div className="space-y-4">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  custom={index + 2}
                >
                  <Card className="p-4 bg-background/50 hover-elevate" data-testid={`section-${section.id}`}>
                    <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid={`heading-${section.id}`}>
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`content-${section.id}`}>
                      {section.content}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={9}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6" data-testid="text-features-title">Key Features for Beginners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-4 bg-card/50 backdrop-blur-sm hover-elevate" data-testid={`card-feature-${index}`}>
                  <h3 className="font-semibold mb-2 text-foreground" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`feature-desc-${index}`}>
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={10}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4" data-testid="text-mistakes-title">Common Beginner Mistakes to Avoid</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li data-testid="mistake-1">❌ <strong>No Seed Phrase Backup:</strong> Write it down NOW - you'll lose your wallet forever if you don't</li>
              <li data-testid="mistake-2">❌ <strong>High Slippage:</strong> Set to 2-5% for stable coins, 10-20% for volatile tokens</li>
              <li data-testid="mistake-3">❌ <strong>Trading Too Much:</strong> Start with small amounts ($10-50)</li>
              <li data-testid="mistake-4">❌ <strong>Not Checking Fees:</strong> Bot always shows fees before trade - review them!</li>
              <li data-testid="mistake-5">❌ <strong>Buying Random Tokens:</strong> Research on Birdeye or DEX Screener first</li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={11}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4" data-testid="text-security-title">Security Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="security-1">🔒 <strong>Never share your seed phrase</strong> - anyone with it can steal all your crypto</li>
              <li data-testid="security-2">✅ <strong>Enable notifications</strong> to see all trades in real-time</li>
              <li data-testid="security-3">📝 <strong>Start small</strong> while learning ($10-50 trades first)</li>
              <li data-testid="security-4">🛡️ <strong>Only use official bot:</strong> @Zinochainbot</li>
              <li data-testid="security-5">📱 <strong>Backup wallet:</strong> Write seed phrase on paper, store safely</li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={12}
            className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Ready to start trading? Open Telegram and search for <strong>@Zinochainbot</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Remember: Start small, learn as you go, and don't invest more than you can afford to lose. 🚀
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

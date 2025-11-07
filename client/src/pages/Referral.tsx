import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Gift, TrendingUp, Share2, UserPlus, Coins, Trophy, ArrowRight } from "lucide-react";

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

export default function Referral() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <div className="p-6 bg-primary/10 rounded-full border border-primary/30 glow-border">
                <Share2 className="h-16 w-16 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-referral-title"
            >
              Referral <span className="gradient-text">Program</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-referral-subtitle"
            >
              Invite your friends to Zinobot and earn SOL or Zino points for every
              successful referral. The more friends you bring, the more you earn!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold text-center mb-12"
              data-testid="text-how-it-works-title"
            >
              How It <span className="gradient-text">Works</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary -translate-y-1/2" />

              {[
                {
                  step: "1",
                  icon: Share2,
                  title: "Share Your Link",
                  description:
                    "Get your unique referral link from Zinobot and share it with friends via social media, messaging apps, or email.",
                },
                {
                  step: "2",
                  icon: UserPlus,
                  title: "Friend Joins",
                  description:
                    "Your friend clicks your link, launches Zinobot on Telegram, and starts trading on the Solana network.",
                },
                {
                  step: "3",
                  icon: Coins,
                  title: "Earn Rewards",
                  description:
                    "You earn SOL or Zino points when your friend completes their first trade and continues trading on the platform.",
                },
              ].map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="relative z-10">
                  <Card className="p-8 h-full bg-card/80 backdrop-blur-sm glow-border hover-elevate" data-testid={`card-how-it-works-${index}`}>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                        <div className="relative p-4 bg-primary/10 rounded-full border border-primary/30">
                          <step.icon className="h-10 w-10 text-primary" />
                        </div>
                      </div>
                      <div className="text-5xl font-bold gradient-text">{step.step}</div>
                      <h3 className="text-xl font-semibold" data-testid={`text-step-title-${index}`}>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-step-description-${index}`}>
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold text-center mb-12"
              data-testid="text-benefits-title"
            >
              Referral <span className="gradient-text">Benefits</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Coins,
                  title: "SOL Rewards",
                  description: "Earn SOL for each successful referral",
                },
                {
                  icon: Gift,
                  title: "Bonus Points",
                  description: "Accumulate Zino points for exclusive perks",
                },
                {
                  icon: TrendingUp,
                  title: "Lifetime Earnings",
                  description: "Earn from your referrals' trading activity",
                },
                {
                  icon: Trophy,
                  title: "Top Referrer Bonuses",
                  description: "Monthly rewards for top performers",
                },
              ].map((benefit, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-6 h-full hover-elevate bg-card/50 backdrop-blur-sm" data-testid={`card-benefit-${index}`}>
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-full border border-primary/30">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold" data-testid={`text-benefit-title-${index}`}>{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
                        {benefit.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mb-20"
          >
            <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/30 glow-border" data-testid="card-leaderboard-teaser">
              <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-primary" />
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-leaderboard-title"
              >
                <span className="gradient-text">Leaderboard</span> Coming Soon
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                data-testid="text-leaderboard-description"
              >
                Track your ranking against other referrers and compete for exclusive
                rewards. Top performers will receive monthly bonuses and special
                recognition in the community.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <div className="inline-block px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full border border-border" data-testid="text-leaderboard-status">
                  <span className="text-primary font-semibold">Stay tuned for updates!</span>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold mb-6"
              data-testid="text-cta-title"
            >
              Ready to Start <span className="gradient-text">Earning?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              data-testid="text-cta-description"
            >
              Launch Zinobot on Telegram to get your unique referral link and start
              earning rewards today.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="gradient-bg text-lg px-8 py-6 border-primary-border"
                asChild
                data-testid="button-launch-bot"
              >
                <a
                  href="https://t.me/Zinobot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Launch Zinobot <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

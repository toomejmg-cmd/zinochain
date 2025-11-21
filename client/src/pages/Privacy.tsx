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

export default function Privacy() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content:
        "Zinochain ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process your information in relation to our services.",
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      content: `We collect information in various ways, including:
- Information you provide directly: When you use our Telegram bot, access our website, or contact us, you may provide information such as your Telegram user ID, wallet addresses, and transaction details.
- Automatic collection: We may automatically collect certain information about your device, browser, and how you interact with our services.
- Analytics: We use analytics tools to understand how users interact with our platform and improve our services.`,
    },
    {
      id: "information-use",
      title: "3. How We Use Your Information",
      content: `We use the information we collect for various purposes:
- To provide, maintain, and improve our services
- To process transactions and send related information
- To send technical notices, updates, and security alerts
- To respond to your inquiries and provide customer support
- To monitor and analyze trends, usage, and activities
- To detect, prevent, and address technical issues and fraud
- To comply with legal obligations`,
    },
    {
      id: "information-sharing",
      title: "4. Information Sharing",
      content: `We may share your information with:
- Service providers who assist us in operating our website and providing our services
- Legal authorities when required by law or to protect our rights and users
- Third parties with your explicit consent
We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.`,
    },
    {
      id: "security",
      title: "5. Data Security",
      content:
        "We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, and destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      id: "blockchain-security",
      title: "6. Blockchain and Wallet Security",
      content:
        "When using Zinochain Bot for multi-chain trading across Solana, Ethereum, and Binance Smart Chain, your wallet information is protected with industry-standard encryption. You maintain control of your private keys at all times. We recommend using strong passwords and enabling two-factor authentication on your Telegram account for additional security.",
    },
    {
      id: "cookies",
      title: "7. Cookies and Tracking",
      content:
        "We may use cookies and similar tracking technologies to enhance your experience on our website. You can choose to disable cookies through your browser settings, but this may affect the functionality of some features.",
    },
    {
      id: "retention",
      title: "8. Data Retention",
      content:
        "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by contacting us, subject to certain legal and operational requirements.",
    },
    {
      id: "rights",
      title: "9. Your Privacy Rights",
      content: `Depending on your location, you may have certain rights regarding your personal information:
- The right to access your personal information
- The right to correct or update your information
- The right to request deletion of your information
- The right to opt-out of certain data processing activities
To exercise these rights, please contact us at hi@zinochain.com.`,
    },
    {
      id: "third-party",
      title: "10. Third-Party Links",
      content:
        "Our website and services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.",
    },
    {
      id: "children",
      title: "11. Children's Privacy",
      content:
        "Zinochain is not intended for users under the age of 18. We do not knowingly collect personal information from children under 18. If we discover that a child under 18 has provided us with personal information, we will delete such information promptly.",
    },
    {
      id: "updates",
      title: "12. Updates to This Policy",
      content:
        "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any significant changes by updating the date of this policy and, if necessary, by sending you a notification. Your continued use of our services indicates your acceptance of the updated policy.",
    },
    {
      id: "contact",
      title: "13. Contact Us",
      content:
        "If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at hi@zinochain.com. We are committed to working with you to resolve any privacy-related issues.",
    },
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
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              data-testid="text-privacy-title"
            >
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-privacy-intro">
              Your privacy is important to us. This Privacy Policy outlines how
              we collect, use, and protect your information when you use
              Zinochain.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={index + 1}
              >
                <Card
                  className="p-6 bg-card/50 backdrop-blur-sm"
                  data-testid={`section-${section.id}`}
                >
                  <h2
                    className="text-xl font-bold mb-3 text-foreground"
                    data-testid={`heading-${section.id}`}
                  >
                    {section.title}
                  </h2>
                  <p
                    className="text-muted-foreground whitespace-pre-line leading-relaxed"
                    data-testid={`content-${section.id}`}
                  >
                    {section.content}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={sections.length + 1}
            className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50"
          >
            <p className="text-sm text-muted-foreground text-center">
              Last updated: November 2025. This policy is effective immediately
              and will remain in effect until modified by us.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

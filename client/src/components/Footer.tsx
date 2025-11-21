import { Link } from "wouter";
import { Send, Twitter, Mail } from "lucide-react";
import logoImage from "@assets/ChatGPT Image Nov 8, 2025, 08_36_07 AM_1762587458220.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Zinochain Logo" 
                className="h-12 w-12 object-contain"
                data-testid="img-footer-logo"
              />
              <div className="text-2xl font-bold gradient-text" data-testid="text-footer-logo">
                Zinochain
              </div>
            </div>
            <p className="text-muted-foreground text-sm" data-testid="text-footer-tagline">
              AI-powered multi-chain trading ecosystem for Solana, Ethereum, and BSC
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground" data-testid="text-footer-links-heading">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" data-testid="link-footer-home">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/referral" data-testid="link-footer-referral">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Referral Program
                </span>
              </Link>
              <Link href="/docs" data-testid="link-footer-docs">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Documentation
                </span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground" data-testid="text-footer-legal-heading">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link href="/terms" data-testid="link-footer-terms">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Terms & Conditions
                </span>
              </Link>
              <Link href="/privacy" data-testid="link-footer-privacy">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground" data-testid="text-footer-contact-heading">Contact & Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hi@zinochain.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4" />
                <span>hi@zinochain.com</span>
              </a>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://t.me/zinochainbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate p-2 bg-card rounded-md border border-card-border"
                  data-testid="link-telegram"
                  title="Open Zinochain Bot on Telegram"
                >
                  <Send className="h-4 w-4 text-primary" />
                </a>
                <a
                  href="https://twitter.com/zinochain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate p-2 bg-card rounded-md border border-card-border"
                  data-testid="link-twitter"
                  title="Follow us on Twitter"
                >
                  <Twitter className="h-4 w-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © {currentYear} Zinochain. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right max-w-sm">
              Zinochain Bot is a non-custodial trading tool. Always ensure you understand the risks before trading.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

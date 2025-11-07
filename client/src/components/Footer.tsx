import { Link } from "wouter";
import { Send, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold gradient-text" data-testid="text-footer-logo">
              Zinochain
            </div>
            <p className="text-muted-foreground text-sm" data-testid="text-footer-tagline">
              AI-powered Solana trading ecosystem
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground" data-testid="text-footer-links-heading">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" data-testid="link-footer-home">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/referral" data-testid="link-footer-referral">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Referral
                </span>
              </Link>
              <Link href="/docs" data-testid="link-footer-docs">
                <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                  Docs
                </span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground" data-testid="text-footer-connect-heading">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://t.me/Zinobot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-3 bg-card rounded-md border border-card-border"
                data-testid="link-telegram"
              >
                <Send className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://twitter.com/zinochain"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-3 bg-card rounded-md border border-card-border"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {currentYear} Zinochain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

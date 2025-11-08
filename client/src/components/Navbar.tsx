import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletButton } from "@/components/WalletButton";
import logoImage from "@assets/ChatGPT Image Nov 8, 2025, 08_28_59 AM_1762586994074.png";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Referral", href: "/referral" },
    { name: "Docs", href: "/docs" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg" 
        : "bg-background/80 backdrop-blur-lg border-b border-border/50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
            <img 
              src={logoImage} 
              alt="Zinochain Logo" 
              className="h-10 w-10 object-contain"
              data-testid="img-logo"
            />
            <div className="text-2xl font-bold gradient-text" data-testid="text-logo">
              Zinochain
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} data-testid={`link-nav-${item.name.toLowerCase()}`}>
                <Button
                  variant="ghost"
                  className={location === item.href ? "text-primary" : ""}
                  data-testid={`button-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button
              variant="default"
              className="gradient-bg border-primary-border"
              asChild
              data-testid="button-launch-bot-nav"
            >
              <a
                href="https://t.me/zinochainbot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Launch Zinobot
              </a>
            </Button>
            <WalletButton />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${location === item.href ? "text-primary" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`button-mobile-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Button
                variant="default"
                className="w-full gradient-bg"
                asChild
                data-testid="button-launch-bot-mobile"
              >
                <a
                  href="https://t.me/zinochainbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Launch Zinobot
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

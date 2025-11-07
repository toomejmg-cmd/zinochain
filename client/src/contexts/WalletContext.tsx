import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";

interface WalletContextType {
  walletAddress: string | null;
  user: User | null;
  connecting: boolean;
  connectWallet: (address: string, referrerCode?: string) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(() => {
    return localStorage.getItem("walletAddress");
  });
  const [user, setUser] = useState<User | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      fetch(`/api/users/${walletAddress}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) setUser(data);
        })
        .catch(() => {});
    }
  }, [walletAddress]);

  const connectWallet = async (address: string, referrerCode?: string) => {
    setConnecting(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          walletAddress: address,
          referrerCode 
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to connect wallet");
      }
      
      const userData = await response.json();
      setUser(userData);
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setUser(null);
    localStorage.removeItem("walletAddress");
  };

  return (
    <WalletContext.Provider value={{ walletAddress, user, connecting, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

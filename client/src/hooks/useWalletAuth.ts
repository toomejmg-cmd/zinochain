import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
  publicKey: { toString: () => string } | null;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider;
    };
  }
}

export function useWalletAuth() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      setIsConnecting(true);

      // Check if Phantom is installed
      const provider = window.phantom?.solana;
      if (!provider?.isPhantom) {
        toast({
          title: "Phantom Wallet Not Found",
          description: "Please install Phantom wallet extension to connect",
          variant: "destructive",
        });
        window.open("https://phantom.app/", "_blank");
        return;
      }

      // Connect to Phantom
      const { publicKey } = await provider.connect();
      const walletAddress = publicKey.toString();

      // Request nonce from server
      const nonceRes = await apiRequest("POST", "/api/auth/nonce", { walletAddress });
      const nonceData = await nonceRes.json() as { nonce: string; message: string; expiresAt: string };

      // Sign the message
      const encodedMessage = new TextEncoder().encode(nonceData.message);
      const { signature } = await provider.signMessage(encodedMessage, "utf8");

      // Convert signature to base58
      const bs58 = await import("bs58");
      const signatureBase58 = bs58.default.encode(signature);

      // Login with signature (server will use its own timestamp from database)
      const loginRes = await apiRequest("POST", "/api/auth/wallet-login", {
        walletAddress,
        signature: signatureBase58,
        nonce: nonceData.nonce,
      });
      const loginData = await loginRes.json();

      // Invalidate auth cache
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Connected!",
        description: `Wallet ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)} connected successfully`,
      });

      // Redirect to dashboard
      window.location.href = "/dashboard";

      return loginData;
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      const provider = window.phantom?.solana;
      if (provider) {
        await provider.disconnect();
      }
      
      // Clear session on server
      await apiRequest("POST", "/api/auth/logout");

      // Invalidate auth cache
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Disconnected",
        description: "Wallet disconnected successfully",
      });

      window.location.href = "/";
    } catch (error: any) {
      console.error("Wallet disconnection error:", error);
      toast({
        title: "Disconnection Failed",
        description: error.message || "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
  };
}

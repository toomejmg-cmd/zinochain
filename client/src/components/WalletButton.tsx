import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, LogOut, Copy, Check } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

export function WalletButton() {
  const { walletAddress, user, connecting, connectWallet, disconnectWallet } = useWallet();
  const [inputAddress, setInputAddress] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!inputAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter a wallet address",
        variant: "destructive",
      });
      return;
    }

    try {
      await connectWallet(inputAddress.trim(), referrerCode.trim() || undefined);
      setOpen(false);
      setInputAddress("");
      setReferrerCode("");
      toast({
        title: "Connected!",
        description: "Your wallet has been connected successfully.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (walletAddress && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2" data-testid="button-wallet-connected">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{truncateAddress(walletAddress)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel data-testid="text-wallet-address">
            {truncateAddress(walletAddress)}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={copyAddress} data-testid="button-copy-address">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy Address"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet} data-testid="button-disconnect-wallet">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg" data-testid="button-connect-wallet">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="dialog-connect-wallet">
        <DialogHeader>
          <DialogTitle data-testid="text-dialog-title">Connect Wallet</DialogTitle>
          <DialogDescription data-testid="text-dialog-description">
            Enter your Solana wallet address to connect
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-address" data-testid="label-wallet-address">Wallet Address</Label>
            <Input
              id="wallet-address"
              placeholder="Enter your wallet address..."
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              data-testid="input-wallet-address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referrer-code" data-testid="label-referrer-code">Referral Code (Optional)</Label>
            <Input
              id="referrer-code"
              placeholder="Enter referral code..."
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              data-testid="input-referrer-code"
            />
          </div>
          <Button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full gradient-bg"
            data-testid="button-submit-connect"
          >
            {connecting ? "Connecting..." : "Connect"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

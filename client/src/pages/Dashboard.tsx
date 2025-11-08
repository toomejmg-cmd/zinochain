import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { TrendingUp, TrendingDown, Wallet, Gift, Users, Rocket, ArrowUpDown, Copy, CheckCircle2 } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useLocation } from "wouter";
import type { User, Token, Trade, TokenClaim, Investment } from "@shared/schema";

interface TokenPrice {
  tokenId: string;
  symbol: string;
  name: string;
  mintAddress: string;
  price: string;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [walletAddress, setWalletAddress] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedTradeToken, setSelectedTradeToken] = useState<string>("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");

  // Fetch data
  const { data: prices = [] } = useQuery<TokenPrice[]>({
    queryKey: ["/api/tokens/prices"],
    refetchInterval: 30000,
  });

  const { data: trades = [] } = useQuery<Trade[]>({
    queryKey: ["/api/dashboard/trades"],
  });

  const { data: claims = [] } = useQuery<TokenClaim[]>({
    queryKey: ["/api/dashboard/claims"],
  });

  const { data: investments = [] } = useQuery<Investment[]>({
    queryKey: ["/api/dashboard/investments"],
  });

  // Update wallet mutation
  const updateWalletMutation = useMutation({
    mutationFn: async (address: string) => {
      return await apiRequest("/api/auth/wallet", "PUT", { walletAddress: address });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({ title: "Success", description: "Wallet connected successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Session Expired", description: "Please log in again", variant: "destructive" });
        setTimeout(() => setLocation("/api/login"), 1500);
      } else {
        toast({ title: "Error", description: "Failed to connect wallet", variant: "destructive" });
      }
    },
  });

  // Create trade mutation
  const createTradeMutation = useMutation({
    mutationFn: async (data: { tokenId: string; type: string; amount: string; price: string }) => {
      const token = (prices as TokenPrice[]).find((p: TokenPrice) => p.tokenId === data.tokenId);
      if (!token) throw new Error("Token not found");
      
      const amount = parseFloat(data.amount);
      const price = parseFloat(token.price);
      const totalValue = amount * price;

      return await apiRequest("/api/dashboard/trades", "POST", {
        tokenId: data.tokenId,
        type: data.type,
        amount: amount.toString(),
        price: price.toString(),
        totalValue: totalValue.toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/trades"] });
      toast({ title: "Success", description: "Trade created successfully" });
      setTradeAmount("");
      setSelectedTradeToken("");
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Session Expired", description: "Please log in again", variant: "destructive" });
        setTimeout(() => setLocation("/api/login"), 1500);
      } else {
        toast({ title: "Error", description: "Failed to create trade", variant: "destructive" });
      }
    },
  });

  // Claim token mutation
  const claimTokenMutation = useMutation({
    mutationFn: async (claimId: string) => {
      return await apiRequest(`/api/dashboard/claims/${claimId}/claim`, "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/claims"] });
      toast({ title: "Success", description: "Tokens claimed successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Session Expired", description: "Please log in again", variant: "destructive" });
        setTimeout(() => setLocation("/api/login"), 1500);
      } else {
        toast({ title: "Error", description: "Failed to claim tokens", variant: "destructive" });
      }
    },
  });

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopiedCode(true);
      toast({ title: "Copied!", description: "Referral code copied to clipboard" });
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/api/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Zinochain Dashboard</h1>
            <Badge data-testid="badge-user-tier">{user.tier}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-user-email">
              {user.email || "User"}
            </span>
            <Button onClick={() => setLocation("/api/logout")} variant="outline" data-testid="button-logout">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="trade" data-testid="tab-trade">Trade</TabsTrigger>
            <TabsTrigger value="claims" data-testid="tab-claims">Claims</TabsTrigger>
            <TabsTrigger value="invest" data-testid="tab-invest">Invest</TabsTrigger>
            <TabsTrigger value="referral" data-testid="tab-referral">Referral</TabsTrigger>
            <TabsTrigger value="wallet" data-testid="tab-wallet">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-rewards">
                    {user.totalRewards || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Earned from referrals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-referrals">
                    {user.totalReferrals || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Total referred users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-active-trades">
                    {(trades as Trade[]).filter((t: Trade) => t.status === "pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Pending transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investments</CardTitle>
                  <Rocket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-active-investments">
                    {(investments as Investment[]).filter((i: Investment) => i.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active investments</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Live Token Prices</CardTitle>
                <CardDescription>Real-time Raydium token prices from DexScreener</CardDescription>
              </CardHeader>
              <CardContent>
                {(prices as TokenPrice[]).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tokens available</p>
                ) : (
                  <div className="space-y-4">
                    {(prices as TokenPrice[]).map((token: TokenPrice) => (
                      <div
                        key={token.tokenId}
                        className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                        data-testid={`card-token-${token.symbol}`}
                      >
                        <div>
                          <h4 className="font-semibold">{token.symbol}</h4>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold" data-testid={`text-price-${token.symbol}`}>
                            ${parseFloat(token.price).toFixed(6)}
                          </p>
                          <div className="flex items-center gap-1 text-sm">
                            {token.priceChange24h >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                              {token.priceChange24h.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trade" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Direct Platform Trading</CardTitle>
                <CardDescription>Trade tokens directly on the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="select-token">Select Token</Label>
                  <select
                    id="select-token"
                    value={selectedTradeToken}
                    onChange={(e) => setSelectedTradeToken(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    data-testid="select-trade-token"
                  >
                    <option value="">Select a token</option>
                    {(prices as TokenPrice[]).map((token: TokenPrice) => (
                      <option key={token.tokenId} value={token.tokenId}>
                        {token.symbol} - ${parseFloat(token.price).toFixed(6)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-amount">Amount</Label>
                  <Input
                    id="input-amount"
                    type="number"
                    placeholder="0.00"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    data-testid="input-trade-amount"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setTradeType("buy")}
                    variant={tradeType === "buy" ? "default" : "outline"}
                    className="flex-1"
                    data-testid="button-trade-buy"
                  >
                    Buy
                  </Button>
                  <Button
                    onClick={() => setTradeType("sell")}
                    variant={tradeType === "sell" ? "default" : "outline"}
                    className="flex-1"
                    data-testid="button-trade-sell"
                  >
                    Sell
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    if (!selectedTradeToken || !tradeAmount) {
                      toast({ title: "Error", description: "Please select token and amount", variant: "destructive" });
                      return;
                    }
                    const token = (prices as TokenPrice[]).find((p: TokenPrice) => p.tokenId === selectedTradeToken);
                    if (!token) return;
                    createTradeMutation.mutate({
                      tokenId: selectedTradeToken,
                      type: tradeType,
                      amount: tradeAmount,
                      price: token.price,
                    });
                  }}
                  disabled={createTradeMutation.isPending || !selectedTradeToken || !tradeAmount}
                  className="w-full"
                  data-testid="button-execute-trade"
                >
                  {createTradeMutation.isPending ? "Processing..." : `${tradeType === "buy" ? "Buy" : "Sell"} Tokens`}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>Your recent trades</CardDescription>
              </CardHeader>
              <CardContent>
                {(trades as Trade[]).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No trades yet</p>
                ) : (
                  <div className="space-y-2">
                    {(trades as Trade[]).slice(0, 10).map((trade: Trade) => (
                      <div
                        key={trade.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                        data-testid={`trade-${trade.id}`}
                      >
                        <div>
                          <Badge variant={trade.type === "buy" ? "default" : "secondary"}>{trade.type}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(trade.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{trade.amount} tokens</p>
                          <p className="text-sm text-muted-foreground">${trade.totalValue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Free Token Claims</CardTitle>
                <CardDescription>Claim your free tokens distributed by admins</CardDescription>
              </CardHeader>
              <CardContent>
                {(claims as TokenClaim[]).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tokens available to claim</p>
                ) : (
                  <div className="space-y-4">
                    {(claims as TokenClaim[]).map((claim: TokenClaim) => (
                      <div
                        key={claim.id}
                        className="flex items-center justify-between p-4 rounded-lg border"
                        data-testid={`claim-${claim.id}`}
                      >
                        <div>
                          <p className="font-semibold">{claim.amount} tokens</p>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(claim.createdAt).toLocaleDateString()}
                          </p>
                          {claim.expiresAt && (
                            <p className="text-sm text-muted-foreground">
                              Expires: {new Date(claim.expiresAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {claim.claimedAt ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="text-sm">Claimed</span>
                          </div>
                        ) : (
                          <Button
                            onClick={() => claimTokenMutation.mutate(claim.id)}
                            disabled={claimTokenMutation.isPending}
                            data-testid={`button-claim-${claim.id}`}
                          >
                            {claimTokenMutation.isPending ? "Claiming..." : "Claim"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Future Coin Investments</CardTitle>
                <CardDescription>Invest in upcoming token launches</CardDescription>
              </CardHeader>
              <CardContent>
                {(investments as Investment[]).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No investments yet</p>
                ) : (
                  <div className="space-y-4">
                    {(investments as Investment[]).map((investment: Investment) => (
                      <div
                        key={investment.id}
                        className="p-4 rounded-lg border"
                        data-testid={`investment-${investment.id}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge>{investment.status}</Badge>
                          <p className="font-semibold">${investment.amount}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{investment.shares} shares</p>
                        {investment.expectedLaunchDate && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Expected Launch: {new Date(investment.expectedLaunchDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Code</CardTitle>
                <CardDescription>Share your code to earn rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={user.referralCode || ""}
                    readOnly
                    className="font-mono text-lg"
                    data-testid="input-referral-code"
                  />
                  <Button onClick={copyReferralCode} variant="outline" size="icon" data-testid="button-copy-code">
                    {copiedCode ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Total Referrals</p>
                    <p className="text-2xl font-bold" data-testid="text-referral-count">
                      {user.totalReferrals || 0}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Rewards Earned</p>
                    <p className="text-2xl font-bold" data-testid="text-referral-rewards">
                      {user.totalRewards || 0}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Share your referral code with friends to earn rewards. Each successful referral earns you 10 reward
                  points!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Management</CardTitle>
                <CardDescription>Connect your Solana wallet or purchase crypto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.walletAddress ? (
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-2">Connected Wallet</p>
                    <p className="font-mono text-sm break-all" data-testid="text-connected-wallet">
                      {user.walletAddress}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wallet-input">Solana Wallet Address</Label>
                      <Input
                        id="wallet-input"
                        placeholder="Enter your Solana wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        data-testid="input-wallet-address"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        if (!walletAddress) {
                          toast({ title: "Error", description: "Please enter wallet address", variant: "destructive" });
                          return;
                        }
                        updateWalletMutation.mutate(walletAddress);
                      }}
                      disabled={updateWalletMutation.isPending}
                      data-testid="button-connect-wallet"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      {updateWalletMutation.isPending ? "Connecting..." : "Connect Wallet"}
                    </Button>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Purchase Crypto with MoonPay</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Buy crypto directly with your credit card or bank account
                  </p>
                  <Button
                    onClick={() => window.open("https://www.moonpay.com/buy", "_blank")}
                    variant="outline"
                    className="w-full"
                    data-testid="button-moonpay"
                  >
                    Open MoonPay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

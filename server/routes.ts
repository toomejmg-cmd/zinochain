import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated as isReplitAuthenticated } from "./replitAuth";
import { verifyWalletSignature, isAuthenticated, getUserFromSession } from "./walletAuth";
import {
  type InsertUser,
  insertUserSchema,
  insertReferralSchema,
  insertCommunityStatsSchema,
  insertAnalyticsEventSchema,
  insertTokenSchema,
  insertTradeSchema,
  insertTokenClaimSchema,
  insertInvestmentSchema,
} from "@shared/schema";
import { nanoid } from "nanoid";
import axios from "axios";

function generateReferralCode(): string {
  return nanoid(8).toUpperCase();
}

function calculateTier(referralCount: number): string {
  if (referralCount >= 50) return "gold";
  if (referralCount >= 20) return "silver";
  return "bronze";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth middleware (from blueprint)
  await setupAuth(app);

  // Wallet authentication endpoints
  app.post("/api/auth/nonce", async (req, res) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress || typeof walletAddress !== "string") {
        return res.status(400).json({ error: "Valid wallet address required" });
      }

      // Cleanup expired nonces periodically
      await storage.cleanupExpiredNonces();

      // Generate new nonce
      const { nonce, expiresAt } = await storage.createNonce(walletAddress);
      
      res.json({ 
        nonce, 
        message: `Sign this message to authenticate with Zinochain:\n\nNonce: ${nonce}\nTimestamp: ${expiresAt.toISOString()}`,
        expiresAt: expiresAt.toISOString() 
      });
    } catch (error) {
      console.error("Error generating nonce:", error);
      res.status(500).json({ error: "Failed to generate nonce" });
    }
  });

  app.post("/api/auth/wallet-login", async (req: any, res) => {
    try {
      const { walletAddress, signature, nonce } = req.body;
      
      if (!walletAddress || !signature || !nonce) {
        return res.status(400).json({ error: "Wallet address, signature, and nonce required" });
      }

      // Get nonce record from database (not consumed yet)
      const nonceRecord = await storage.getNonceRecord(walletAddress, nonce);
      if (!nonceRecord) {
        return res.status(401).json({ error: "Invalid or expired nonce" });
      }

      // Create message using server-side timestamp (never trust client input)
      const message = `Sign this message to authenticate with Zinochain:\n\nNonce: ${nonce}\nTimestamp: ${nonceRecord.expiresAt.toISOString()}`;

      // Verify the signature
      const isValid = await verifyWalletSignature(walletAddress, signature, message);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      // Signature is valid, now consume the nonce
      await storage.consumeNonce(walletAddress, nonce);

      // Create or get user by wallet
      const user = await storage.createOrGetUserByWallet(walletAddress);

      // Set session
      req.session.walletAddress = walletAddress.toLowerCase();
      req.session.userId = user.id;

      res.json({ 
        success: true,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          tier: user.tier,
          totalReferrals: user.totalReferrals,
          totalRewards: user.totalRewards,
          referralCode: user.referralCode,
        }
      });
    } catch (error) {
      console.error("Error during wallet login:", error);
      res.status(500).json({ error: "Failed to authenticate" });
    }
  });

  app.post("/api/auth/logout", async (req: any, res) => {
    try {
      req.session.destroy((err: any) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ error: "Failed to logout" });
        }
        res.json({ success: true });
      });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ error: "Failed to logout" });
    }
  });

  // Auth routes (works with both Replit Auth and Wallet Auth)
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = await getUserFromSession(req);
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user wallet
  app.put("/api/auth/wallet", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { walletAddress } = req.body;
      
      if (!walletAddress || typeof walletAddress !== "string") {
        return res.status(400).json({ error: "Valid wallet address required" });
      }

      await storage.updateUserWallet(userId, walletAddress);
      const updatedUser = await storage.getUser(userId);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating wallet:", error);
      res.status(500).json({ error: "Failed to update wallet" });
    }
  });

  // Token price endpoints (proxy to DexScreener API)
  app.get("/api/tokens/prices", async (req, res) => {
    try {
      const tokens = await storage.getActiveTokens();
      const pricesPromises = tokens.map(async (token) => {
        try {
          const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${token.mintAddress}`, {
            timeout: 5000,
          });
          const pair = response.data?.pairs?.[0];
          return {
            tokenId: token.id,
            symbol: token.symbol,
            name: token.name,
            mintAddress: token.mintAddress,
            price: pair?.priceUsd || "0",
            priceChange24h: pair?.priceChange?.h24 || 0,
            volume24h: pair?.volume?.h24 || 0,
            liquidity: pair?.liquidity?.usd || 0,
          };
        } catch {
          return {
            tokenId: token.id,
            symbol: token.symbol,
            name: token.name,
            mintAddress: token.mintAddress,
            price: "0",
            priceChange24h: 0,
            volume24h: 0,
            liquidity: 0,
          };
        }
      });
      const prices = await Promise.all(pricesPromises);
      res.json(prices);
    } catch (error) {
      console.error("Error fetching prices:", error);
      res.status(500).json({ error: "Failed to fetch token prices" });
    }
  });

  // Dashboard: Get user trades
  app.get("/api/dashboard/trades", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const trades = await storage.getUserTrades(userId);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({ error: "Failed to fetch trades" });
    }
  });

  // Dashboard: Create trade
  app.post("/api/dashboard/trades", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tradeData = insertTradeSchema.parse({ ...req.body, userId });
      const trade = await storage.createTrade(tradeData);
      res.json(trade);
    } catch (error) {
      console.error("Error creating trade:", error);
      res.status(400).json({ error: "Failed to create trade" });
    }
  });

  // Dashboard: Get unclaimed tokens
  app.get("/api/dashboard/claims", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const claims = await storage.getUnclaimedTokens(userId);
      res.json(claims);
    } catch (error) {
      console.error("Error fetching claims:", error);
      res.status(500).json({ error: "Failed to fetch claims" });
    }
  });

  // Dashboard: Claim token
  app.post("/api/dashboard/claims/:id/claim", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const claimId = req.params.id;
      
      const existingClaim = await storage.getUserClaims(userId);
      const claim = existingClaim.find((c) => c.id === claimId);
      
      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }
      
      if (claim.claimedAt) {
        return res.status(400).json({ error: "Token already claimed" });
      }
      
      const claimedToken = await storage.claimToken(claimId);
      res.json(claimedToken);
    } catch (error) {
      console.error("Error claiming token:", error);
      res.status(500).json({ error: "Failed to claim token" });
    }
  });

  // Dashboard: Get user investments
  app.get("/api/dashboard/investments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const investments = await storage.getUserInvestments(userId);
      res.json(investments);
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ error: "Failed to fetch investments" });
    }
  });

  // Dashboard: Create investment
  app.post("/api/dashboard/investments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const investmentData = insertInvestmentSchema.parse({ ...req.body, userId });
      const investment = await storage.createInvestment(investmentData);
      res.json(investment);
    } catch (error) {
      console.error("Error creating investment:", error);
      res.status(400).json({ error: "Failed to create investment" });
    }
  });

  // Admin: Create token
  app.post("/api/admin/tokens", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const tokenData = insertTokenSchema.parse(req.body);
      const token = await storage.createToken(tokenData);
      res.json(token);
    } catch (error) {
      console.error("Error creating token:", error);
      res.status(400).json({ error: "Failed to create token" });
    }
  });

  // Admin: Create token claim
  app.post("/api/admin/claims", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const claimData = insertTokenClaimSchema.parse({ ...req.body, createdBy: userId });
      const claim = await storage.createTokenClaim(claimData);
      res.json(claim);
    } catch (error) {
      console.error("Error creating claim:", error);
      res.status(400).json({ error: "Failed to create claim" });
    }
  });

  // Public user creation (legacy endpoint)
  app.post("/api/users", async (req, res) => {
    try {
      const { walletAddress, referrerCode } = req.body;
      
      if (!walletAddress || typeof walletAddress !== "string") {
        return res.status(400).json({ error: "Valid wallet address required" });
      }
      
      const existingUser = await storage.getUserByWallet(walletAddress);
      if (existingUser) {
        return res.json(existingUser);
      }
      
      let referrerId: string | undefined;
      
      if (referrerCode && typeof referrerCode === "string") {
        const referrer = await storage.getUserByReferralCode(referrerCode);
        if (!referrer) {
          return res.status(400).json({ error: "Invalid referral code" });
        }
        referrerId = referrer.id;
      }
      
      const userData: InsertUser = {
        walletAddress,
        referredBy: referrerId,
        tier: "bronze",
        totalReferrals: 0,
        totalRewards: 0,
        isAdmin: false,
      };
      
      const user = await storage.createUser(userData);
      
      if (referrerId) {
        const referrer = await storage.getUserById(referrerId);
        if (referrer) {
          await storage.createReferral({
            referrerId: referrerId,
            refereeId: user.id,
            rewardAmount: 10,
          });
          
          const newTotalReferrals = referrer.totalReferrals + 1;
          const newTotalRewards = referrer.totalRewards + 10;
          const newTier = calculateTier(newTotalReferrals);
          
          await storage.updateUserStats(referrerId, newTotalReferrals, newTotalRewards, newTier);
        }
      }
      
      res.json(user);
    } catch (error) {
      console.error("User creation error:", error);
      res.status(400).json({ error: "Failed to create user" });
    }
  });
  
  app.get("/api/users/:walletAddress", async (req, res) => {
    const user = await storage.getUserByWallet(req.params.walletAddress);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });
  
  app.get("/api/users/:id/referrals", async (req, res) => {
    const referralsList = await storage.getReferralsByReferrerId(req.params.id);
    res.json(referralsList);
  });
  
  app.get("/api/leaderboard", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 50;
    const topReferrers = await storage.getTopReferrers(limit);
    res.json(topReferrers);
  });
  
  app.get("/api/stats", async (req, res) => {
    const stats = await storage.getCommunityStats();
    res.json(stats);
  });
  
  app.put("/api/stats", async (req, res) => {
    try {
      const statsData = insertCommunityStatsSchema.parse(req.body);
      const updatedStats = await storage.updateCommunityStats(statsData);
      res.json(updatedStats);
    } catch (error) {
      res.status(400).json({ error: "Invalid stats data" });
    }
  });
  
  app.post("/api/analytics", async (req, res) => {
    try {
      const eventData = insertAnalyticsEventSchema.parse(req.body);
      const event = await storage.createAnalyticsEvent(eventData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });
  
  app.get("/api/admin/users", async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  const httpServer = createServer(app);

  return httpServer;
}

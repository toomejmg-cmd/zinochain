import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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
  app.get("/api/dashboard/trades", async (req: any, res) => {
    try {
      const userId = req.query.userId || req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const trades = await storage.getUserTrades(userId);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({ error: "Failed to fetch trades" });
    }
  });

  // Dashboard: Create trade
  app.post("/api/dashboard/trades", async (req: any, res) => {
    try {
      const { userId, ...tradeData } = req.body;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const parsedData = insertTradeSchema.parse({ ...tradeData, userId });
      const trade = await storage.createTrade(parsedData);
      res.json(trade);
    } catch (error) {
      console.error("Error creating trade:", error);
      res.status(400).json({ error: "Failed to create trade" });
    }
  });

  // Dashboard: Get unclaimed tokens
  app.get("/api/dashboard/claims", async (req: any, res) => {
    try {
      const userId = req.query.userId || req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const claims = await storage.getUnclaimedTokens(userId);
      res.json(claims);
    } catch (error) {
      console.error("Error fetching claims:", error);
      res.status(500).json({ error: "Failed to fetch claims" });
    }
  });

  // Dashboard: Claim token
  app.post("/api/dashboard/claims/:id/claim", async (req: any, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
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
  app.get("/api/dashboard/investments", async (req: any, res) => {
    try {
      const userId = req.query.userId || req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const investments = await storage.getUserInvestments(userId);
      res.json(investments);
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ error: "Failed to fetch investments" });
    }
  });

  // Dashboard: Create investment
  app.post("/api/dashboard/investments", async (req: any, res) => {
    try {
      const { userId, ...investmentData } = req.body;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const parsedData = insertInvestmentSchema.parse({ ...investmentData, userId });
      const investment = await storage.createInvestment(parsedData);
      res.json(investment);
    } catch (error) {
      console.error("Error creating investment:", error);
      res.status(400).json({ error: "Failed to create investment" });
    }
  });

  // Admin: Create token (public - no auth required)
  app.post("/api/admin/tokens", async (req: any, res) => {
    try {
      const tokenData = insertTokenSchema.parse(req.body);
      const token = await storage.createToken(tokenData);
      res.json(token);
    } catch (error) {
      console.error("Error creating token:", error);
      res.status(400).json({ error: "Failed to create token" });
    }
  });

  // Admin: Create token claim (public - no auth required)
  app.post("/api/admin/claims", async (req: any, res) => {
    try {
      const { createdBy, ...claimData } = req.body;
      const parsedData = insertTokenClaimSchema.parse({ ...claimData, createdBy: createdBy || "system" });
      const claim = await storage.createTokenClaim(parsedData);
      res.json(claim);
    } catch (error) {
      console.error("Error creating claim:", error);
      res.status(400).json({ error: "Failed to create claim" });
    }
  });

  // Get user referrals
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

  app.get("/api/rewards", async (req, res) => {
    try {
      let rewards = await storage.getAutomatedRewards();
      if (!rewards) {
        rewards = await storage.createAutomatedRewards();
      }
      res.json(rewards);
    } catch (error) {
      console.error("Error fetching automated rewards:", error);
      res.status(500).json({ error: "Failed to fetch rewards" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

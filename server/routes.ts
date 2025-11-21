import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCommunityStatsSchema,
  insertAnalyticsEventSchema,
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

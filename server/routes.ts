import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { type InsertUser, insertUserSchema, insertReferralSchema, insertCommunityStatsSchema, insertAnalyticsEventSchema } from "@shared/schema";
import { nanoid } from "nanoid";

function generateReferralCode(): string {
  return nanoid(8).toUpperCase();
}

function calculateTier(referralCount: number): string {
  if (referralCount >= 50) return "gold";
  if (referralCount >= 20) return "silver";
  return "bronze";
}

export async function registerRoutes(app: Express): Promise<Server> {
  
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
        referralCode: generateReferralCode(),
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

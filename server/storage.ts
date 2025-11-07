import { 
  type User, 
  type InsertUser,
  type Referral,
  type InsertReferral,
  type CommunityStats,
  type InsertCommunityStats,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  users,
  referrals,
  communityStats,
  analyticsEvents,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUserById(id: string): Promise<User | undefined>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  getUserByReferralCode(referralCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStats(id: string, totalReferrals: number, totalRewards: number, tier: string): Promise<void>;
  
  createReferral(referral: InsertReferral): Promise<Referral>;
  getReferralsByReferrerId(referrerId: string): Promise<Referral[]>;
  
  getCommunityStats(): Promise<CommunityStats | undefined>;
  updateCommunityStats(stats: Partial<InsertCommunityStats>): Promise<CommunityStats>;
  
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  
  getTopReferrers(limit: number): Promise<User[]>;
  getAllUsers(): Promise<User[]>;
}

export class DbStorage implements IStorage {
  async getUserById(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return result[0];
  }

  async getUserByReferralCode(referralCode: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.referralCode, referralCode));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUserStats(id: string, totalReferrals: number, totalRewards: number, tier: string): Promise<void> {
    await db.update(users)
      .set({ totalReferrals, totalRewards, tier })
      .where(eq(users.id, id));
  }

  async createReferral(referral: InsertReferral): Promise<Referral> {
    const result = await db.insert(referrals).values(referral).returning();
    return result[0];
  }

  async getReferralsByReferrerId(referrerId: string): Promise<Referral[]> {
    return await db.select().from(referrals).where(eq(referrals.referrerId, referrerId));
  }

  async getCommunityStats(): Promise<CommunityStats | undefined> {
    const result = await db.select().from(communityStats).limit(1);
    if (result.length === 0) {
      const newStats = await db.insert(communityStats).values({
        totalRewardsDistributed: 0,
        totalUsers: 0,
        totalTrades: 0,
      }).returning();
      return newStats[0];
    }
    return result[0];
  }

  async updateCommunityStats(stats: Partial<InsertCommunityStats>): Promise<CommunityStats> {
    const existing = await this.getCommunityStats();
    if (!existing) {
      return (await db.insert(communityStats).values({
        totalRewardsDistributed: stats.totalRewardsDistributed || 0,
        totalUsers: stats.totalUsers || 0,
        totalTrades: stats.totalTrades || 0,
      }).returning())[0];
    }
    
    const result = await db.update(communityStats)
      .set({ ...stats, updatedAt: new Date() })
      .where(eq(communityStats.id, existing.id))
      .returning();
    return result[0];
  }

  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const result = await db.insert(analyticsEvents).values(event).returning();
    return result[0];
  }

  async getTopReferrers(limit: number): Promise<User[]> {
    return await db.select()
      .from(users)
      .orderBy(desc(users.totalReferrals))
      .limit(limit);
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
}

export const storage = new DbStorage();

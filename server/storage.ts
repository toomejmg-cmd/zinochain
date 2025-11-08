import { 
  type User, 
  type UpsertUser,
  type InsertUser,
  type Referral,
  type InsertReferral,
  type CommunityStats,
  type InsertCommunityStats,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type Token,
  type InsertToken,
  type Trade,
  type InsertTrade,
  type TokenClaim,
  type InsertTokenClaim,
  type Investment,
  type InsertInvestment,
  users,
  referrals,
  communityStats,
  analyticsEvents,
  tokens,
  trades,
  tokenClaims,
  investments,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, isNull } from "drizzle-orm";

export interface IStorage {
  // User operations (Replit Auth required)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Legacy user operations
  getUserById(id: string): Promise<User | undefined>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  getUserByReferralCode(referralCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStats(id: string, totalReferrals: number, totalRewards: number, tier: string): Promise<void>;
  updateUserWallet(id: string, walletAddress: string): Promise<void>;
  
  // Referral operations
  createReferral(referral: InsertReferral): Promise<Referral>;
  getReferralsByReferrerId(referrerId: string): Promise<Referral[]>;
  
  // Community stats
  getCommunityStats(): Promise<CommunityStats | undefined>;
  updateCommunityStats(stats: Partial<InsertCommunityStats>): Promise<CommunityStats>;
  
  // Analytics
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  
  // Token operations
  getAllTokens(): Promise<Token[]>;
  getActiveTokens(): Promise<Token[]>;
  getTokenById(id: string): Promise<Token | undefined>;
  getTokenByMintAddress(mintAddress: string): Promise<Token | undefined>;
  createToken(token: InsertToken): Promise<Token>;
  updateToken(id: string, updates: Partial<InsertToken>): Promise<Token>;
  
  // Trade operations
  getUserTrades(userId: string): Promise<Trade[]>;
  createTrade(trade: InsertTrade): Promise<Trade>;
  updateTradeStatus(id: string, status: string, transactionHash?: string): Promise<Trade>;
  
  // Token claim operations
  getUserClaims(userId: string): Promise<TokenClaim[]>;
  getUnclaimedTokens(userId: string): Promise<TokenClaim[]>;
  createTokenClaim(claim: InsertTokenClaim): Promise<TokenClaim>;
  claimToken(id: string): Promise<TokenClaim>;
  
  // Investment operations
  getUserInvestments(userId: string): Promise<Investment[]>;
  getActiveInvestments(userId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestmentStatus(id: string, status: string): Promise<Investment>;
  
  // Admin operations
  getTopReferrers(limit: number): Promise<User[]>;
  getAllUsers(): Promise<User[]>;
}

export class DbStorage implements IStorage {
  // Replit Auth required methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Legacy user methods
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

  async updateUserWallet(id: string, walletAddress: string): Promise<void> {
    await db.update(users)
      .set({ walletAddress, updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  // Referral methods
  async createReferral(referral: InsertReferral): Promise<Referral> {
    const result = await db.insert(referrals).values(referral).returning();
    return result[0];
  }

  async getReferralsByReferrerId(referrerId: string): Promise<Referral[]> {
    return await db.select().from(referrals).where(eq(referrals.referrerId, referrerId));
  }

  // Community stats methods
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

  // Analytics
  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const result = await db.insert(analyticsEvents).values(event).returning();
    return result[0];
  }

  // Token methods
  async getAllTokens(): Promise<Token[]> {
    return await db.select().from(tokens).orderBy(desc(tokens.createdAt));
  }

  async getActiveTokens(): Promise<Token[]> {
    return await db.select().from(tokens).where(eq(tokens.isActive, true)).orderBy(desc(tokens.createdAt));
  }

  async getTokenById(id: string): Promise<Token | undefined> {
    const [token] = await db.select().from(tokens).where(eq(tokens.id, id));
    return token;
  }

  async getTokenByMintAddress(mintAddress: string): Promise<Token | undefined> {
    const [token] = await db.select().from(tokens).where(eq(tokens.mintAddress, mintAddress));
    return token;
  }

  async createToken(token: InsertToken): Promise<Token> {
    const [result] = await db.insert(tokens).values(token).returning();
    return result;
  }

  async updateToken(id: string, updates: Partial<InsertToken>): Promise<Token> {
    const [result] = await db.update(tokens).set(updates).where(eq(tokens.id, id)).returning();
    return result;
  }

  // Trade methods
  async getUserTrades(userId: string): Promise<Trade[]> {
    return await db.select().from(trades).where(eq(trades.userId, userId)).orderBy(desc(trades.createdAt));
  }

  async createTrade(trade: InsertTrade): Promise<Trade> {
    const [result] = await db.insert(trades).values(trade).returning();
    return result;
  }

  async updateTradeStatus(id: string, status: string, transactionHash?: string): Promise<Trade> {
    const [result] = await db.update(trades)
      .set({ status, transactionHash })
      .where(eq(trades.id, id))
      .returning();
    return result;
  }

  // Token claim methods
  async getUserClaims(userId: string): Promise<TokenClaim[]> {
    return await db.select().from(tokenClaims).where(eq(tokenClaims.userId, userId)).orderBy(desc(tokenClaims.createdAt));
  }

  async getUnclaimedTokens(userId: string): Promise<TokenClaim[]> {
    return await db.select().from(tokenClaims)
      .where(and(eq(tokenClaims.userId, userId), isNull(tokenClaims.claimedAt)))
      .orderBy(desc(tokenClaims.createdAt));
  }

  async createTokenClaim(claim: InsertTokenClaim): Promise<TokenClaim> {
    const [result] = await db.insert(tokenClaims).values(claim).returning();
    return result;
  }

  async claimToken(id: string): Promise<TokenClaim> {
    const [result] = await db.update(tokenClaims)
      .set({ claimedAt: new Date() })
      .where(eq(tokenClaims.id, id))
      .returning();
    return result;
  }

  // Investment methods
  async getUserInvestments(userId: string): Promise<Investment[]> {
    return await db.select().from(investments).where(eq(investments.userId, userId)).orderBy(desc(investments.createdAt));
  }

  async getActiveInvestments(userId: string): Promise<Investment[]> {
    return await db.select().from(investments)
      .where(and(eq(investments.userId, userId), eq(investments.status, 'active')))
      .orderBy(desc(investments.createdAt));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [result] = await db.insert(investments).values(investment).returning();
    return result;
  }

  async updateInvestmentStatus(id: string, status: string): Promise<Investment> {
    const [result] = await db.update(investments)
      .set({ status })
      .where(eq(investments.id, id))
      .returning();
    return result;
  }

  // Admin methods
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

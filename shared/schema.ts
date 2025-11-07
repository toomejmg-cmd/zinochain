import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: varchar("referred_by"),
  tier: text("tier").notNull().default("bronze"),
  totalReferrals: integer("total_referrals").notNull().default(0),
  totalRewards: integer("total_rewards").notNull().default(0),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerId: varchar("referrer_id").notNull().references(() => users.id),
  refereeId: varchar("referee_id").notNull().references(() => users.id),
  rewardAmount: integer("reward_amount").notNull().default(10),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communityStats = pgTable("community_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalRewardsDistributed: integer("total_rewards_distributed").notNull().default(0),
  totalUsers: integer("total_users").notNull().default(0),
  totalTrades: integer("total_trades").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(),
  userId: varchar("user_id").references(() => users.id),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
});

export const insertCommunityStatsSchema = createInsertSchema(communityStats).omit({
  id: true,
  updatedAt: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Referral = typeof referrals.$inferSelect;
export type InsertCommunityStats = z.infer<typeof insertCommunityStatsSchema>;
export type CommunityStats = typeof communityStats.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

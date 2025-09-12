import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Safety alerts table
export const safetyAlerts = pgTable("safety_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: varchar("severity", { length: 20 }).notNull(), // low, medium, high, critical
  location: text("location"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Safety tips table
export const safetyTips = pgTable("safety_tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  priority: varchar("priority", { length: 20 }).default("medium"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Emergency contacts table
export const emergencyContacts = pgTable("emergency_contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // police, hospital, embassy, etc.
  location: text("location"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User preferences table
export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  language: varchar("language", { length: 10 }).default("en"),
  locationSharingEnabled: boolean("location_sharing_enabled").default(true),
  emergencyContactsJson: jsonb("emergency_contacts_json").default([]),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Export schemas for validation
export const insertSafetyAlertSchema = createInsertSchema(safetyAlerts).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSafetyTipSchema = createInsertSchema(safetyTips).omit({ id: true, createdAt: true });
export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts).omit({ id: true, createdAt: true });
export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({ id: true, updatedAt: true });

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type SafetyAlert = typeof safetyAlerts.$inferSelect;
export type SafetyTip = typeof safetyTips.$inferSelect;
export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type UserPreferences = typeof userPreferences.$inferSelect;

export type InsertSafetyAlert = z.infer<typeof insertSafetyAlertSchema>;
export type InsertSafetyTip = z.infer<typeof insertSafetyTipSchema>;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
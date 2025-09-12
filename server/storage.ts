import {
  users,
  safetyAlerts,
  safetyTips,
  emergencyContacts,
  userPreferences,
  chatMessages,
  type User,
  type UpsertUser,
  type SafetyAlert,
  type SafetyTip,
  type EmergencyContact,
  type UserPreferences,
  type ChatMessage,
  type InsertSafetyAlert,
  type InsertSafetyTip,
  type InsertEmergencyContact,
  type InsertUserPreferences,
  type InsertChatMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Safety operations  
  getSafetyAlerts(): Promise<SafetyAlert[]>;
  createSafetyAlert(alert: InsertSafetyAlert): Promise<SafetyAlert>;
  
  getSafetyTips(): Promise<SafetyTip[]>;
  createSafetyTip(tip: InsertSafetyTip): Promise<SafetyTip>;
  
  getEmergencyContacts(): Promise<EmergencyContact[]>;
  createEmergencyContact(contact: InsertEmergencyContact): Promise<EmergencyContact>;
  
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  upsertUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
  
  // Chat operations
  getChatHistory(userId: string, limit?: number): Promise<ChatMessage[]>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  clearChatHistory(userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
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

  // Safety operations
  async getSafetyAlerts(): Promise<SafetyAlert[]> {
    return await db.select().from(safetyAlerts).where(eq(safetyAlerts.isActive, true));
  }

  async createSafetyAlert(alertData: InsertSafetyAlert): Promise<SafetyAlert> {
    const [alert] = await db.insert(safetyAlerts).values(alertData).returning();
    return alert;
  }

  async getSafetyTips(): Promise<SafetyTip[]> {
    return await db.select().from(safetyTips).where(eq(safetyTips.isActive, true));
  }

  async createSafetyTip(tipData: InsertSafetyTip): Promise<SafetyTip> {
    const [tip] = await db.insert(safetyTips).values(tipData).returning();
    return tip;
  }

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return await db.select().from(emergencyContacts).where(eq(emergencyContacts.isActive, true));
  }

  async createEmergencyContact(contactData: InsertEmergencyContact): Promise<EmergencyContact> {
    const [contact] = await db.insert(emergencyContacts).values(contactData).returning();
    return contact;
  }

  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [prefs] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
    return prefs;
  }

  async upsertUserPreferences(prefsData: InsertUserPreferences): Promise<UserPreferences> {
    const [prefs] = await db
      .insert(userPreferences)
      .values(prefsData)
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: {
          ...prefsData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return prefs;
  }

  // Chat operations
  async getChatHistory(userId: string, limit: number = 20): Promise<ChatMessage[]> {
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
    
    // Return messages in chronological order (oldest first)
    return messages.reverse();
  }

  async addChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(messageData).returning();
    return message;
  }

  async clearChatHistory(userId: string): Promise<void> {
    await db.delete(chatMessages).where(eq(chatMessages.userId, userId));
  }
}

export const storage = new DatabaseStorage();

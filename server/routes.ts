import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import OpenAI from "openai";

// OpenAI client - use blueprint integration
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Rate limiting map for basic per-user rate limiting
const userRateLimits = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = { requests: 20, windowMs: 5 * 60 * 1000 }; // 20 requests per 5 minutes

// Chat message validation schema
const chatMessageSchema = z.object({
  message: z.string().min(1).max(1000)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes  
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Safety alerts routes
  app.get("/api/safety-alerts", async (req, res) => {
    try {
      const alerts = await storage.getSafetyAlerts();
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching safety alerts:", error);
      res.status(500).json({ message: "Failed to fetch safety alerts" });
    }
  });

  app.post("/api/safety-alerts", isAuthenticated, async (req, res) => {
    try {
      const alert = await storage.createSafetyAlert(req.body);
      res.json(alert);
    } catch (error) {
      console.error("Error creating safety alert:", error);
      res.status(500).json({ message: "Failed to create safety alert" });
    }
  });

  // Safety tips routes
  app.get("/api/safety-tips", async (req, res) => {
    try {
      const tips = await storage.getSafetyTips();
      res.json(tips);
    } catch (error) {
      console.error("Error fetching safety tips:", error);
      res.status(500).json({ message: "Failed to fetch safety tips" });
    }
  });

  // Emergency contacts routes
  app.get("/api/emergency-contacts", async (req, res) => {
    try {
      const contacts = await storage.getEmergencyContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching emergency contacts:", error);
      res.status(500).json({ message: "Failed to fetch emergency contacts" });
    }
  });

  // SOS Emergency route
  app.post("/api/sos", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { location, latitude, longitude } = req.body;
      
      // Create emergency alert
      const alert = await storage.createSafetyAlert({
        title: "SOS EMERGENCY ALERT",
        message: `Emergency assistance requested by user ${userId}`,
        severity: "critical",
        location,
        latitude,
        longitude,
      });

      // TODO: In production, this would trigger real emergency services
      console.log("SOS Alert triggered:", alert);
      
      res.json({ 
        success: true, 
        message: "Emergency alert sent successfully",
        alertId: alert.id 
      });
    } catch (error) {
      console.error("Error sending SOS alert:", error);
      res.status(500).json({ message: "Failed to send emergency alert" });
    }
  });

  // User preferences routes
  app.get("/api/user-preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferences = await storage.getUserPreferences(userId);
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      res.status(500).json({ message: "Failed to fetch preferences" });
    }
  });

  app.post("/api/user-preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferences = await storage.upsertUserPreferences({
        userId,
        ...req.body,
      });
      res.json(preferences);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // Chat routes
  app.get("/api/chat/history", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = parseInt(req.query.limit as string) || 20;
      const history = await storage.getChatHistory(userId, limit);
      res.json(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  app.delete("/api/chat/history", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.clearChatHistory(userId);
      res.json({ success: true, message: "Chat history cleared" });
    } catch (error) {
      console.error("Error clearing chat history:", error);
      res.status(500).json({ message: "Failed to clear chat history" });
    }
  });

  app.post("/api/chat", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Rate limiting check
      const now = Date.now();
      const userLimit = userRateLimits.get(userId) || { count: 0, lastReset: now };
      
      if (now - userLimit.lastReset > RATE_LIMIT.windowMs) {
        userLimit.count = 0;
        userLimit.lastReset = now;
      }
      
      if (userLimit.count >= RATE_LIMIT.requests) {
        return res.status(429).json({ message: "Rate limit exceeded. Please wait before sending more messages." });
      }
      
      userLimit.count++;
      userRateLimits.set(userId, userLimit);

      // Validate request body
      const validation = chatMessageSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid message format" });
      }
      
      const { message } = validation.data;

      // Store user message
      await storage.addChatMessage({
        userId,
        role: 'user',
        content: message
      });

      // Get recent chat history for context
      const recentHistory = await storage.getChatHistory(userId, 10);
      
      // Get safety data for context
      const [safetyTips, emergencyContacts] = await Promise.all([
        storage.getSafetyTips(),
        storage.getEmergencyContacts()
      ]);

      // Build context-aware system prompt
      const systemPrompt = `You are Safar Saarthi's AI Safety Assistant, a tourist safety companion app focused on RGIPT, Jais, Amethi area in Uttar Pradesh, India.

Your role:
- Provide safety advice and emergency guidance
- Answer questions about app features (SOS, maps, tips, emergency contacts)
- Help with location-specific safety concerns for RGIPT area
- Keep responses concise and actionable
- Always include safety disclaimers when appropriate

Current location context: RGIPT (Rajiv Gandhi Institute of Petroleum Technology), Jais, Amethi, Uttar Pradesh

Available emergency contacts:
${emergencyContacts.slice(0, 5).map(contact => `- ${contact.name}: ${contact.phoneNumber} (${contact.type})`).join('\n')}

Key safety tips from our database:
${safetyTips.slice(0, 3).map(tip => `- ${tip.title}: ${tip.content.substring(0, 100)}...`).join('\n')}

IMPORTANT: 
- For real emergencies, always direct users to call emergency services immediately (112 in India)
- This is an AI assistant, not a substitute for professional emergency services
- Keep responses under 200 words for better mobile readability`;

      // Prepare messages for OpenAI
      const messages: any[] = [
        { role: 'system', content: systemPrompt }
      ];
      
      // Add recent history for context (limit to prevent token overflow)
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages,
        max_tokens: 300,
        temperature: 0.7,
      });

      const assistantMessage = response.choices[0].message.content;
      
      if (!assistantMessage) {
        throw new Error("No response from AI assistant");
      }

      // Store assistant response
      await storage.addChatMessage({
        userId,
        role: 'assistant',
        content: assistantMessage
      });

      res.json({ 
        message: assistantMessage,
        usage: response.usage 
      });

    } catch (error) {
      console.error("Error in chat endpoint:", error);
      res.status(500).json({ message: "Failed to process chat message. Please try again." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

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

  const httpServer = createServer(app);

  return httpServer;
}
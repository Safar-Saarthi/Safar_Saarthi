import { useState } from "react";
import { Search, AlertTriangle, MapPin, QrCode, MessageCircle, LogIn, LogOut, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const handleAdminLogin = () => {
    toast({
      title: "Admin Login",
      description: "Redirecting to admin authentication...",
    });
    // For now, use the same login flow - in production this could be a separate admin portal
    window.location.href = '/api/login';
  };

  // Updated location to RGIPT, Jais, Amethi
  const mockData = {
    status: "SAFE",
    location: "RGIPT, Jais, Amethi, UP",
    alertsCount: 2,
    alerts: [
      { id: "1", text: "Heavy Rainfall expected in City Center", type: "warning" },
      { id: "2", text: "Avoid XYZ Street after 8 PM (high crime rate)", type: "danger" },
    ]
  };

  const handleLocationShare = () => {
    toast({
      title: "Location sharing initiated",
      description: "Your location is now being shared with emergency contacts",
    });
  };

  const handleChatbotClick = () => {
    toast({
      title: "AI Chatbot coming soon!",
      description: "Smart safety assistance will be available soon",
    });
  };

  return (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-sm font-semibold">
                {isAuthenticated ? ((user as any)?.firstName?.[0] || (user as any)?.email?.[0] || "U") : "G"}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold" data-testid="text-app-title">Safar Saarthi</h1>
              <p className="text-xs opacity-90">Tourist Safety Companion</p>
            </div>
          </div>
          
          {/* Authentication Buttons */}
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 animate-pulse"></div>
            ) : isAuthenticated ? (
              <Button
                data-testid="button-logout"
                onClick={handleLogout}
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  data-testid="button-user-login"
                  onClick={handleLogin}
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 text-xs"
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  User Login
                </Button>
                <Button
                  data-testid="button-admin-login"
                  onClick={handleAdminLogin}
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 text-xs"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Button>
              </>
            )}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4" data-testid="text-welcome">
          {isAuthenticated ? 
            `WELCOME, ${(user as any)?.firstName || 'Traveler'}!` : 
            'WELCOME, Traveler!'
          }
        </h2>
        
        {!isAuthenticated && (
          <div className="mb-4 p-3 bg-primary-foreground/10 rounded-lg">
            <p className="text-sm opacity-90 mb-2">
              <LogIn className="h-4 w-4 inline mr-1" />
              Sign in to access personalized safety features, emergency contacts, and location sharing.
            </p>
            <div className="flex gap-2">
              <Button
                data-testid="button-main-login"
                onClick={handleLogin}
                variant="secondary"
                size="sm"
                className="bg-primary-foreground text-primary"
              >
                <UserCheck className="h-3 w-3 mr-1" />
                Sign In as User
              </Button>
              <Button
                data-testid="button-main-admin-login"
                onClick={handleAdminLogin}
                variant="secondary"
                size="sm"
                className="bg-primary-foreground text-primary"
              >
                <Shield className="h-3 w-3 mr-1" />
                Admin Portal
              </Button>
            </div>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            data-testid="input-search"
            placeholder="Search Location / Attractions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background text-foreground"
          />
        </div>
      </div>

      {/* Quick Safety Actions */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3" data-testid="text-quick-actions">Quick Safety Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button
            data-testid="button-sos"
            onClick={() => onNavigate("sos")}
            variant="destructive"
            className="flex-col h-20 gap-2"
          >
            <AlertTriangle className="h-6 w-6" />
            <div className="text-xs text-center">
              <div className="font-semibold">SOS</div>
              <div>Emergency Button</div>
            </div>
          </Button>
          
          <Button
            data-testid="button-share-location"
            onClick={handleLocationShare}
            variant="outline"
            className="flex-col h-20 gap-2"
          >
            <MapPin className="h-6 w-6 text-primary" />
            <div className="text-xs text-center">
              <div className="font-semibold">Share My</div>
              <div>Location</div>
            </div>
          </Button>
          
          <Button
            data-testid="button-digital-id"
            onClick={() => onNavigate("profile")}
            variant="outline"
            className="flex-col h-20 gap-2"
          >
            <QrCode className="h-6 w-6" />
            <div className="text-xs text-center">
              <div className="font-semibold">Digital Tourist</div>
              <div>ID (QR)</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3" data-testid="text-dashboard">Dashboard</h3>
        
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Current Status:</span>
                <Badge 
                  data-testid="badge-status"
                  variant={mockData.status === "SAFE" ? "default" : "destructive"}
                  className="bg-chart-2 text-white"
                >
                  {mockData.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Current Location:</span>
                <span className="text-sm font-medium" data-testid="text-location">
                  {mockData.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Alerts Nearby:</span>
                <Badge variant="outline" data-testid="badge-alerts-count">
                  {mockData.alertsCount}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mock Map */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="bg-muted rounded-lg h-32 relative overflow-hidden">
              <div className="absolute inset-2 bg-chart-2/20 rounded"></div>
              <div className="absolute top-4 left-4 w-3 h-3 bg-chart-2 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-6 w-2 h-2 bg-destructive rounded-full"></div>
              <Badge className="absolute bottom-2 right-2 bg-destructive text-destructive-foreground text-xs">
                Risk Zones
              </Badge>
              <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span>Tourist Police</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base" data-testid="text-safety-alerts">Safety Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3" data-testid={`alert-${alert.id}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === "danger" ? "bg-destructive" : "bg-orange-500"
                  }`}></div>
                  <p className="text-sm text-muted-foreground">{alert.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Chatbot Button */}
      <Button
        data-testid="button-chatbot"
        onClick={handleChatbotClick}
        className="fixed bottom-24 right-4 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
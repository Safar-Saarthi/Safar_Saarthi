import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

// Components
import Landing from "@/components/Landing";
import HomeScreen from "@/components/HomeScreen";
import MapScreen from "@/components/MapScreen";
import SOSScreen from "@/components/SOSScreen";
import TipsScreen from "@/components/TipsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import BottomNavigation from "@/components/BottomNavigation";
import ChatButton from "@/components/ChatButton";
import ChatPanel from "@/components/ChatPanel";
import NotFound from "@/pages/not-found";

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigate = (screen: string) => {
    setActiveTab(screen);
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <Switch>
        <Route path="/">
          <HomeScreen onNavigate={handleNavigate} />
        </Route>
        <Route path="/map">
          <MapScreen />
        </Route>
        <Route path="/sos">
          <SOSScreen onNavigate={handleNavigate} />
        </Route>
        <Route path="/tips">
          <TipsScreen />
        </Route>
        <Route path="/profile">
          <ProfileScreen />
        </Route>
        <Route component={NotFound} />
      </Switch>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Floating Chat Components */}
      <ChatButton onClick={handleChatOpen} />
      <ChatPanel isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading Safar Saarthi...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <Route path="/*" component={AuthenticatedApp} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
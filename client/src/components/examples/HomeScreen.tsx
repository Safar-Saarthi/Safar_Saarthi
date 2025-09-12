import { useState } from "react";
import HomeScreen from "../HomeScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function HomeScreenExample() {
  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen bg-background">
          <HomeScreen onNavigate={setCurrentScreen} />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
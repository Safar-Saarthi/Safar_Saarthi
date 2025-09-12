import { useState } from "react";
import SOSScreen from "../SOSScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function SOSScreenExample() {
  const [currentScreen, setCurrentScreen] = useState("sos");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen bg-background">
          <SOSScreen onNavigate={setCurrentScreen} />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
import ProfileScreen from "../ProfileScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function ProfileScreenExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen bg-background">
          <ProfileScreen />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
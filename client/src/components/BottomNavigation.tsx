import { Home, Map, AlertTriangle, Lightbulb, User } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const [, setLocation] = useLocation();

  const tabs = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "map", label: "Map", icon: Map, path: "/map" },
    { id: "sos", label: "SOS", icon: AlertTriangle, path: "/sos", danger: true },
    { id: "tips", label: "Tips", icon: Lightbulb, path: "/tips" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    onTabChange(tab.id);
    setLocation(tab.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border shadow-lg z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              data-testid={`button-nav-${tab.id}`}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors hover-elevate",
                isActive 
                  ? tab.danger 
                    ? "bg-destructive text-destructive-foreground" 
                    : "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
                tab.danger && !isActive && "hover:text-destructive",
                "min-w-[60px]"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
import { useState } from "react";
import BottomNavigation from "../BottomNavigation";

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="h-screen bg-background relative">
      <div className="p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">Safar Saarthi App</h1>
        <p className="text-muted-foreground">
          Current tab: <span className="font-semibold text-foreground">{activeTab}</span>
        </p>
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
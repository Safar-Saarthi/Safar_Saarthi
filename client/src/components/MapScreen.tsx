import { useState } from "react";
import { MapPin, Shield, AlertTriangle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function MapScreen() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  //todo: remove mock functionality 
  const mockLocations = {
    userLocation: { lat: 28.6139, lng: 77.2090, name: "Your Location" },
    safeZones: [
      { id: "police1", lat: 28.6129, lng: 77.2100, name: "Tourist Police Station", type: "police" },
      { id: "hospital1", lat: 28.6149, lng: 77.2080, name: "AIIMS Emergency", type: "hospital" },
    ],
    riskZones: [
      { id: "risk1", lat: 28.6159, lng: 77.2070, name: "Pickpocket hotspot", severity: "medium" },
    ]
  };

  return (
    <div className="flex-1 relative">
      {/* Mock Map Container */}
      <div className="h-full bg-muted relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            {/* Mock street patterns */}
            <rect x="0" y="200" width="400" height="2" fill="hsl(var(--border))" />
            <rect x="0" y="300" width="400" height="2" fill="hsl(var(--border))" />
            <rect x="100" y="0" width="2" height="600" fill="hsl(var(--border))" />
            <rect x="200" y="0" width="2" height="600" fill="hsl(var(--border))" />
            <rect x="300" y="0" width="2" height="600" fill="hsl(var(--border))" />
          </svg>
        </div>

        {/* User Location Marker */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          data-testid="marker-user-location"
        >
          <div className="relative">
            <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-6 h-6 bg-primary/30 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Safe Zone Markers */}
        <div 
          className="absolute top-1/3 left-1/3 cursor-pointer z-10"
          onClick={() => setSelectedMarker("police1")}
          data-testid="marker-police"
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-chart-2 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover-elevate">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <Badge className="text-xs bg-chart-2 text-white mt-1">Police</Badge>
          </div>
        </div>

        <div 
          className="absolute top-2/3 left-2/3 cursor-pointer z-10"
          onClick={() => setSelectedMarker("hospital1")}
          data-testid="marker-hospital"
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-chart-2 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover-elevate">
              <span className="text-white text-sm font-bold">+</span>
            </div>
            <Badge className="text-xs bg-chart-2 text-white mt-1">Hospital</Badge>
          </div>
        </div>

        {/* Risk Zone Marker */}
        <div 
          className="absolute top-1/4 right-1/4 cursor-pointer z-10"
          onClick={() => setSelectedMarker("risk1")}
          data-testid="marker-risk"
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-destructive rounded-full border-2 border-white shadow-lg flex items-center justify-center hover-elevate">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <Badge className="text-xs bg-destructive text-destructive-foreground mt-1">Risk</Badge>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <Button 
            size="icon" 
            variant="outline" 
            className="bg-background/95 backdrop-blur-sm"
            data-testid="button-center-location"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        <Card className="absolute bottom-4 left-4 z-30 bg-background/95 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                <span>Safe Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span>Risk Zones</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Marker Info */}
        {selectedMarker && (
          <Card className="absolute bottom-4 right-4 z-30 bg-background/95 backdrop-blur-sm max-w-xs">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm" data-testid="text-marker-title">
                    {mockLocations.safeZones.find(l => l.id === selectedMarker)?.name ||
                     mockLocations.riskZones.find(l => l.id === selectedMarker)?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tap for directions and more info
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedMarker(null)}
                  className="h-6 w-6"
                  data-testid="button-close-marker"
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
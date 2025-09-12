import { useState } from "react";
import { MapPin, Shield, AlertTriangle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { EmergencyContact } from "@shared/schema";

export default function MapScreen() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Fetch emergency contacts from database
  const { data: emergencyContacts = [], isLoading } = useQuery<EmergencyContact[]>({
    queryKey: ['/api/emergency-contacts'],
  });

  // Updated location data for RGIPT, Jais, Amethi area
  const locationData = {
    userLocation: { lat: 26.15, lng: 81.51, name: "RGIPT Campus" },
    safeZones: [
      { id: "police1", lat: 26.148, lng: 81.508, name: "Jais Police Station", type: "police" },
      { id: "hospital1", lat: 26.152, lng: 81.515, name: "Amethi District Hospital", type: "hospital" },
      { id: "campus1", lat: 26.15, lng: 81.51, name: "RGIPT Security", type: "campus_security" },
    ],
    riskZones: [
      { id: "risk1", lat: 26.155, lng: 81.505, name: "Construction Zone - Exercise Caution", severity: "low" },
      { id: "risk2", lat: 26.145, lng: 81.52, name: "Heavy Traffic Area", severity: "medium" },
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

        {/* RGIPT Location Marker - Blue Popup */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
          onClick={() => setSelectedMarker(selectedMarker === "rgipt" ? null : "rgipt")}
          data-testid="marker-rgipt"
        >
          <div className="relative group">
            {/* Blue marker with enhanced visibility */}
            <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform duration-200">
              <div className="absolute inset-0 w-8 h-8 bg-primary/30 rounded-full animate-ping"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                RGIPT Campus
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-primary"></div>
              </div>
            </div>
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
              <div className="font-medium text-xs mb-2">Map Legend</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>RGIPT Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                <span>Safe Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span>Caution Areas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Marker Info */}
        {selectedMarker && (
          <Card className="absolute bottom-4 right-4 z-30 bg-background/95 backdrop-blur-sm max-w-xs" data-testid="popup-rgipt">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm" data-testid="text-marker-title">
                    {selectedMarker === "rgipt" ? "RGIPT, Jais, Amethi" :
                     (locationData.safeZones.find(l => l.id === selectedMarker)?.name ||
                      locationData.riskZones.find(l => l.id === selectedMarker)?.name)}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedMarker === "rgipt" ? 
                      "Rajiv Gandhi Institute of Petroleum Technology Campus" :
                      "Tap for directions and more info"}
                  </p>
                  {selectedMarker === "rgipt" && (
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>26.15°N, 81.51°E</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Your Current Location
                      </Badge>
                    </div>
                  )}
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

        {/* Emergency Contacts Panel */}
        {!isLoading && emergencyContacts.length > 0 && (
          <Card className="absolute top-4 left-4 z-30 bg-background/95 backdrop-blur-sm max-w-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency Services Near RGIPT
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {emergencyContacts.slice(0, 4).map((contact) => (
                  <Button
                    key={contact.id}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs h-8"
                    onClick={() => window.open(`tel:${contact.phoneNumber}`)}
                    data-testid={`button-map-contact-${contact.type}`}
                  >
                    <Phone className="h-3 w-3 mr-2" />
                    <div className="flex-1 text-left truncate">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-muted-foreground">{contact.phoneNumber}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}